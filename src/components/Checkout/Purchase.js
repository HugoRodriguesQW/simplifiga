import product from "../../../product.json";
import styles from "../../styles/pages/Checkout.module.css";

export function Purchase({ paypalRef }) {
  return (
    <div className={styles.contentBox}>
      <div className={styles.pricingBox}>
        <div className={styles.titleBox}>
          <p>PREMIUM</p>
        </div>

        <div className={styles.pricingValue}>
          <span>R${product.value}</span>
          <span>/única</span>
        </div>

        <p>Links ilimitados para sempre</p>

        <div className={styles.pricingDetails}>
          <p>Básico, mais:</p>
          <ul>
            <li>Código QR</li>
            <li>Suporte prioritário por email</li>
            <li>Encurtamento de links em massa</li>
          </ul>
        </div>
      </div>

      <div className={styles.rightBox}>
        <div className={styles.textBox}>
          <h1>Checkout</h1>
          <p>
            Falta apenas um passo para tornar-se Premium e obter acesso
            ilimitado.
          </p>
        </div>

        <div className={styles.paypalBox} ref={paypalRef}></div>
      </div>
    </div>
  );
}
