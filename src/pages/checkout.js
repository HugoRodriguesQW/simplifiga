/* eslint-disable react-hooks/exhaustive-deps */
import { loadScript } from "@paypal/paypal-js";
import Router from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { userContext } from "../contexts/UserContext";

export default function Checkout({ product, appToken, clientId }) {
  const [paid, setPaid] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const { logged, token } = useContext(userContext);

  let paypalRef = useRef();

  useEffect(() => {
    if (logged === false) return Router.push("/user/login/?next=checkout");
    if(logged === null) return

    if (document.getElementsByClassName("paypal-buttons").length >= 1) return;

    loadScript({
      "client-id": clientId,
      currency: "BRL",
    })
      .then(async (paypal) => {
        fetch(`${window.location.origin}/api/checkout`, {
          method: "POST",
          headers: {
            authorization: appToken,
          },
          body: JSON.stringify({
            func: "generateId",
            params: {
              token,
            },
          }),
        }).then(async (response) => {
          const result = await response.json();
          if (!result.orderId) throw Error();
          console.info("Creating a order:", result.orderId);

          setLoaded(true);
          paypal
            .Buttons({
              createOrder: (_, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      reference_id: result.orderId,
                      description: product.description,
                      amount: {
                        currency_code: product.code,
                        value: product.value,
                      },
                    },
                  ],
                });
              },
              onApprove: async (_, actions) => {
                const order = await actions.order.capture();
                setPaid(true);
                console.info("order:", order);
              },
            })
            .render(paypalRef.current);
        });
      })
      .catch((err) => {
        console.error("failed to load the PayPal JS SDK script", err);
      });
  }, [logged]);

  return (
    <div>
      Checkout page paid:{String(paid)}
      <div ref={paypalRef}></div>
      loading: {String(loaded)}
    </div>
  );
}

export const getServerSideProps = async () => {
  const product = {
    code: "BRL",
    value: 19,
    description: "Simplifiga Premium",
  };

  return {
    props: {
      product,
      appToken: process.env.NEXT_PUBLIC_APP_TOKEN,
      clientId: process.env.PP_CLIENT_ID,
    },
  };
};
