import Router from "next/router";
import { useContext } from "react";
import { userContext } from "../../contexts/UserContext";
import styles from "../../styles/pages/Checkout.module.css";

export default function Completed() {
  const { orderId, payee } = useContext(userContext);

  function handleNextButton() {
    Router.push("/dashboard");
  }

  return (
    <div className={styles.approvedBox}>
      <div className={styles.textBox}>
        <h1>Pagamento Concluído!</h1>
        <p>
          Seu pagamento foi concluído com sucesso. Aproveite nosso serviço
          Premium.
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
        <button onClick={handleNextButton}>Continuar</button>
      </div>
    </div>
  );
}
