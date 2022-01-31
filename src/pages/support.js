import { Header } from "../components/Header";
import { userContext } from "../contexts/UserContext";
import styles from "../styles/pages/Support.module.css";

export default function Support() {
  const { upgraded } = userContext(userContext);
  return (
    <>
      <Header
        fixed
        padding
        routes={["/", "/dashboard", "/developer", "/pricing", "Sair"]}
      />
      <div className={styles.supportContainer}>
        <div>
          <h1>Entre em contato conosco</h1>
          <p>
            Entre em contato caso tenha encontrado uma <i>falha</i> no site/API
            ou tenha alguma dúvida quanto aos nosso serviços ou documentação.
            Responderemos o mais rápido possível.
          </p>
          <p></p>
          <a
            href={`mailto:mailvitorhugosr@gmail.com?subject=[Simplifiga] Contato Prioritário&body=[Este é o nosso contato prioritário]%0D%0A[Preencha este campo com sua dúvida ou falha encontrada]%0D%0A[Responderemos o mais rápido possível]%0D%0A[Se possível, anexe uma captura de tela]`}
            target="_blank"
            rel="noreferrer"
          >
            Contato por email
          </a>
        </div>
      </div>
    </>
  );
}
