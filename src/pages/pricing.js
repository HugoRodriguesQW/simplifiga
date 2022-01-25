import Router from "next/router";
import { useContext } from "react";
import { PricingHead } from "../components/Head/PricingHead";
import { Header } from "../components/Header";
import { userContext } from "../contexts/UserContext";
import styles from "../styles/pages/Pricing.module.css";

export default function Pricing() {
  const { logged } = useContext(userContext);

  function handleGetStarted() {
    if (logged) return Router.push("/dashboard/");
    Router.push("/user/login");
  }

  function handleUpgrade() {
    if (!logged) return Router.push("/user/login/?next=checkout");
    Router.push("/checkout");
  }

  return (
    <>
      {logged ? (
        <Header
          fixed
          padding
          routes={["/", "/dashboard", "/developer", "Sair"]}
        />
      ) : (
        <Header
          fixed
          padding
          routes={["/", "/user/register", "/user/login", "/developer"]}
        />
      )}

      <div className={styles.container}>
        <PricingHead />

        <div className={styles.contentBox}>
          <div className={styles.textBox}>
            <h1>Atualize seu pacote</h1>
            <p>
              Obtenha encurtamentos ilimitados com o nosso pacote premium. Uma
              taxa única, sem limites.
            </p>
          </div>

          <div className={styles.pricingContainer}>
            <div className={styles.pricingBox}>
              <div className={styles.titleBox}>
                <p>BÁSICO</p>
              </div>

              <div className={styles.pricingValue}>
                <span>R$0</span>
                <span>/única</span>
              </div>

              <p>Até 100 links/mês</p>

              <div className={styles.pricingDetails}>
                <p>Inclui:</p>
                <ul>
                  <li>Cliques ilimitados</li>
                  <li>Apelidos personalizados</li>
                  <li>Dashboard e Analytics básicos</li>
                </ul>
              </div>

              <button onClick={handleGetStarted}>
                <span>COMEÇAR</span>
              </button>
            </div>

            <div className={styles.pricingBox}>
              <div className={styles.titleBox}>
                <p>PREMIUM</p>
              </div>

              <div className={styles.pricingValue}>
                <span>R$19</span>
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

              <button onClick={handleUpgrade}>
                <span>ATUALIZAR</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
