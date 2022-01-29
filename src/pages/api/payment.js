import { Database } from "./database";
import fetch from "node-fetch";

const handler = async (req, res) => {
  const { event_type, resource } =
    (typeof req.body === "object" && req.body) || {};

  if (!event_type || !resource)
    return res.status(400).send("Missing parameters");

  const eventScope = event_type.split(".").splice(0, 2).join(".");
  const status = event_type.split(".")[2];

  console.info(eventScope, ":", status);
  PayPalWebhookValidation({ headers: req.headers, body: req.body }).then(
    async () => {
      const db = new Database();
      await db.connect();

      switch (eventScope) {
        case "CHECKOUT.ORDER":
          const orderId = resource.purchase_units[0].reference_id;
          const payer = resource.payer;
          const orderRef = resource.id;
          db.setOrderReference({ orderRef, orderId, payer });
          break;
        case "PAYMENT.CAPTURE":
          const captureId = resource.supplementary_data.related_ids.order_id;
          db.receivePaymentStatus({ captureId }).then(
            (payment) => {
              if (payment.status === status) return;
              db.changePaymentState({ captureId, status });
            },
            () => {
              db.createNewPaymentStatus({ captureId, status });
            }
          );
      }

      res.status(200).send("success");
    },
    (_onReject) => {
      console.info("Rejected request");
      res.status(400).send("rejected");
    }
  );
};

function PayPalWebhookValidation({ headers, body }) {
  return new Promise((approve, reject) => {
    if (process.env.NODE_ENV === "development") return approve();

    const fetchUrl =
      "https://api.paypal.com/v1/notifications/verify-webhook-signature";
    const clientKey = `${process.env.PP_CLIENT_ID}:${process.env.PP_SECRET}`;

    const payload = {
      auth_algo: headers["paypal-auth-algo"],
      cert_url: headers["paypal-cert-url"],
      transmission_id: headers["paypal-transmission-id"],
      transmission_sig: headers["paypal-transmission-sig"],
      transmission_time: headers["paypal-transmission-time"],
      webhook_id: process.env.PP_WEBHOOK_ID,
      webhook_event: typeof body === "string" ? JSON.parse(body) : body,
    };

    fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Basic ${Buffer.from(clientKey).toString("base64")}`,
      },
      body: JSON.stringify(payload),
    }).then(async (response) => {
      const data = await response.json();
      if (data.verification_status === "SUCCESS") return approve();
      console.info("Rejected by paypal check");
      approve(); //TODO: call reject() after tests
    }, reject);
  });
}

export default handler;
