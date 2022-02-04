import { Header } from "../components/Header";
import styles from "../styles/pages/Redirect.module.css";
import Router from "next/router";

export default function Custom404() {
  function handleBack() {
    Router.back();
  }

  return (
    <div className={styles.redirectContainer}>
      <Header
        fixed
        padding
        routes={["/", "/pricing", "/support", "/developer", "/", "Sair"]}
      />

      <div className={styles.redirectBox}>
        <img src="/icons/empty-folder.svg" alt="not-found" />
        <h1>
          Página não encontrada <span onClick={handleBack}>voltar</span>
        </h1>
      </div>
    </div>
  );
}
