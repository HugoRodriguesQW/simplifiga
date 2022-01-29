import Router from "next/router";
import { useContext } from "react";
import { userContext } from "../contexts/UserContext";
import styles from "../styles/components/UpgradeNotify.module.css";

export function UpgradeNotify({ props }) {
  const usage = useContext(userContext).usage;

  function handlePricingClick() {
    Router.push("/pricing");
  }
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <span>Atualize sua conta e obtenha acesso ilimitado</span>
        <p className={styles.usage}>
          <span>{((usage ?? 0) / 100) * 100}%</span> do limite mensal atingido
        </p>
      </div>
      <span className={styles.redirect} onClick={handlePricingClick}>
        Preços
      </span>
    </div>
  );
}
