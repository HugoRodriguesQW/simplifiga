/* eslint-disable react-hooks/exhaustive-deps */
import { loadScript } from "@paypal/paypal-js";
import Router from "next/router";
import { memo, useContext, useEffect, useRef, useState } from "react";
import { Loading } from "../components/Effects/Loading";
import { Header } from "../components/Header";
import { userContext } from "../contexts/UserContext";
import styles from "../styles/pages/Checkout.module.css";
import productData from "../../product.json";
import { Purchase } from "../components/Checkout/Purchase";
import { ErrorInfo } from "../components/Checkout/ErrorInfo";
import CancelInfo from "../components/Checkout/CancelInfo";
import Completed from "../components/Checkout/Completed";
import Pending from "../components/Checkout/Pending";
import Denied from "../components/Checkout/Denied";
import Reversed from "../components/Checkout/Reversed";

const CheckoutComponent = ({ product, appToken, clientId }) => {
  const upgradeStatus = useContext(userContext).upgraded;
  const updateCacheProp = useContext(userContext).updateCacheProp;

  const [status, setStatus] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const { logged, token } = useContext(userContext);

  let paypalRef = useRef();

  useEffect(() => {
    console.info("upgrade status:", upgradeStatus);
  }, [upgradeStatus]);

  useEffect(() => {
    if (logged === false) return Router.push("/user/login/?next=checkout");
    if (logged === null) return;

    if (document.getElementsByClassName("paypal-buttons").length >= 1) return;
    if (upgradeStatus) return setLoaded(true);
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
          if (!result.orderId) throw Error("OrderId not found");
          updateCacheProp({ prop: "orderId", value: result.orderId });
          setStatus("purchase");
          setLoaded(true);
          paypal
            .Buttons({
              style: {
                color: "blue",
                label: "pay",
              },
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
                updateCacheProp({ prop: "payer", value: order.payer });
                setStatus("approved");
              },
              onCancel: () => setStatus("cancel"),
              onError: () => setStatus("error"),
              onClick: () => setStatus("purchase"),
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
      <Header
        fixed
        padding
        routes={[
          "/pricing",
          "/support",
          "/dashboard",
          "/developer",
          "/",
          "Sair",
        ]}
      />

      {!loaded && <Loading height="600px" />}
      {loaded && (
        <div className={styles.container}>
          {["purchase", "cancel", "error"].includes(status) &&
            !upgradeStatus && <Purchase paypalRef={paypalRef} />}

          {["error"].includes(status) && <ErrorInfo />}
          {["cancel"].includes(status) && <CancelInfo />}

          {["approved"].includes(status) && <Pending />}
          {["PENDING"].includes(upgradeStatus) && <Pending />}
          {["DENIED"].includes(upgradeStatus) && <Denied />}
          {["REVERSED"].includes(upgradeStatus) && <Reversed />}
          {["COMPLETED"].includes(upgradeStatus) && <Completed />}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async () => {
  const product = productData;

  return {
    props: {
      product,
      appToken: process.env.NEXT_PUBLIC_APP_TOKEN,
      clientId: process.env.PP_CLIENT_ID,
    },
  };
};

const Checkout = memo(CheckoutComponent);
export default Checkout;
