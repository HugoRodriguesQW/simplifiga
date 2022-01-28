import Router from "next/router";
import { useContext } from "react";
import { userContext } from "../../contexts/UserContext";
import styles from "../../styles/pages/Checkout.module.css";

export default function Pending() {
  const { orderId, payee } = useContext(userContext);

  function handleNextButton() {
    Router.push("/dashboard");
  }

  function handleContact() {
    Router.push("/support");
  }

  return (
    <div className={styles.approvedBox}>
      <div className={styles.textBox}>
        <h1>Pagamento em Análise</h1>
        <p>
          Este processo pode demorar um pouco. Notificaremos por email quando
          tudo estiver pronto.
        </p>
      </div>

      <div className={styles.approvedDetails}>
        <div className={styles.detailsBox}>
          <p>
            <strong>Identificação:</strong> {orderId}
          </p>
          <p>
            <strong>beneficiário: </strong>
            <span>
              {payee.name.given_name} {payee.name.surname},{" "}
              {payee.email_address}
            </span>
          </p>
        </div>
        <div className={styles.buttonBox}>
          <button onClick={handleNextButton}>Continuar</button>
          <button onClick={handleContact}>Contato</button>
        </div>
      </div>
    </div>
  );
}
