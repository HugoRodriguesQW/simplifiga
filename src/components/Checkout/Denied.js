import Router from "next/router";
import { useContext } from "react";
import { userContext } from "../../contexts/UserContext";
import styles from "../../styles/pages/Checkout.module.css";

export default function Denied() {
  const { orderId, payee, clearOrderData } = useContext(userContext);

  function handleNextButton() {
    clearOrderData().then(() => {
      Router.reload();
    });
  }

  function handleContact() {
    Router.push("/support");
  }

  return (
    <div className={styles.approvedBox}>
      <div className={styles.textBox}>
        <h1>Pagamento Bloqueado</h1>
        <p>
          Não foi possível continuar com a atualização. Entre em contato ou
          tente novamente.
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
          <button onClick={handleNextButton}>Tentar novamente</button>
          <button onClick={handleContact}>Contato</button>
        </div>
      </div>
    </div>
  );
}
