import Router from "next/router";
import { useContext } from "react";
import { userContext } from "../contexts/UserContext";
import styles from "../styles/components/UpgradeNotify.module.css";

export function UpgradeNotify({ customValue, fixed, animation }) {
  const { usage, upgraded } = useContext(userContext);

  const data = {
    DEFAULT: {
      title: "Atualize sua conta e obtenha acesso ilimitado",
      limits: true,
      button: {
        text: "Preços",
        ref: "/pricing",
      },
    },
    PENDING: {
      title: "Seu pagamento está sendo processado",
      limits: true,
      button: {
        ref: "/checkout",
        text: "Andamento",
      },
    },

    COMPLETED: {
      title: "Sua conta possui o plano Premium ilimitado",
      limits: false,
    },
  };

  const useData = data[upgraded] ?? data["DEFAULT"];

  function handlePricingClick(ref) {
    Router.push(ref);
  }

  return (
    <div
      className={`${styles.container} ${fixed && styles.fixed} ${
        animation && styles.animation
      }`}
    >
      <div className={styles.content}>
        <span>{useData.title}</span>
        <p className={styles.usage}>
          {useData.limits && (
            <>
              <span>{customValue ?? ((usage ?? 0) / 100) * 100}%</span>
              {" do limite mensal atingido"}
            </>
          )}
        </p>
      </div>
      {useData.button && (
        <span
          className={styles.redirect}
          onClick={() => {
            handlePricingClick(useData.button.ref);
          }}
        >
          {useData.button.text}
        </span>
      )}
    </div>
  );
}
