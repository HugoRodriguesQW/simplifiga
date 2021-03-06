import { Database } from "./database";

const handler = async (req, res) => {
  const auth = req.headers.authorization;
  const { func, params } = await JSON.parse(req.body);

  if (auth !== process.env.NEXT_PUBLIC_APP_TOKEN || req.method !== "POST")
    return res.json({});

  const exec = functions[func];
  if (exec) res.json(await exec(params));
};

const functions = {
  async clearOrderData({ orderId }) {
    let payload = null;
    const db = new Database();
    await db.connect();

    await db.clearOrderField({ orderId }).then(
      (applied) => (payload = applied),
      (error) => {
        payload = {
          error,
        };
      }
    );
    return payload;
  },
  async checkStatus({ orderId }) {
    let payload = null;

    const db = new Database();
    await db.connect();
    await db.getPaymentStatus({ orderId }).then(
      (status) => {
        payload = status;
      },
      (error) => {
        payload = {
          error,
        };
      }
    );
    return payload;
  },
  async generateId({ token }) {
    const db = new Database();
    await db.connect();

    const orderId = await db.getOrCreateAnOrderID({ token });
    return { orderId };
  },
};

export default handler;
