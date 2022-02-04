/* eslint-disable @next/next/no-img-element */
import { Header } from "../components/Header";
import styles from "../styles/pages/Support.module.css";
import { Form } from "@unform/web";
import Input from "../components/Form/Input";
import TextArea from "../components/Form/TextArea";
import { useContext, useRef, useState } from "react";
import { userContext } from "../contexts/UserContext";
import Router from "next/router";
import * as Yup from "yup";
import { SupportHead } from "../components/Head/SupportHead";
import { ShortenerContext } from "../contexts/Shortener";

export default function Support({ appToken }) {
  const [sending, sendingIs] = useState(false);
  const [completed, completedIs] = useState(false);
  const formRef = useRef(null);

  const { email, upgraded, name, logged } = useContext(userContext);
  const { setError } = useContext(ShortenerContext);
  const loggedStyle = (logged && styles.logged) || null;

  function handleLogin() {
    Router.push("/user/login?next=support");
  }

  function handleCheckout() {
    Router.push("/checkout");
  }

  function handleBack() {
    Router.back();
  }

  async function sendEmail(data, { reset }) {
    sendingIs(true);
    try {
      const fields = Yup.object().shape({
        email: Yup.string()
          .email("Insira um endereço de e-mail válido")
          .required("Insira seu endereço de e-mail"),
        name: Yup.string().required("Insira seu nome"),
        message: Yup.string().required("Insira a mensagem"),
      });

      await fields.validate(data, { abortEarly: false });
      const response = await fetch(`${window.location.origin}/api/contact`, {
        method: "POST",
        body: JSON.stringify({
          upgraded,
          logged,
          appToken,
          ...data,
        }),
      });

      const result = await response.json();

      if (result.sucess) {
        reset();
        sendingIs(false);
        return completedIs(true);
      }

      throw new Error("message-email-error");
    } catch (error) {
      sendingIs(false);
      console.info(error);
      if (error instanceof Yup.ValidationError) {
        const errorMessages = {};
        error.inner.forEach((err) => {
          errorMessages[err.path] = err.message;
        });
        return formRef.current.setErrors(errorMessages);
      }
      setError(103);
    }
  }

  return (
    <>
      <Header
        fixed
        padding
        routes={["/", "/dashboard", "/developer", "/pricing", "Sair"]}
      />

      <SupportHead />

      <div className={styles.supportContainer}>
        <div>
          {!completed && (
            <>
              <h1>Entre em contato conosco</h1>
              <p>
                Entre em contato caso tenha encontrado uma <i>falha</i> no
                site/API ou tenha alguma dúvida quanto aos nosso serviços,
                documentação ou pagamento. Responderemos o mais rápido possível.
              </p>
              <p></p>

              <div className={styles.supportDualBox}>
                {!logged && (
                  <div className={styles.loginBox}>
                    <strong>Login</strong>
                    <img src="/icons/benefit.svg" alt="Benefício" />
                    <p>
                      Já possui uma conta? Acesse para obter um atendimento
                      personalizado
                    </p>

                    <button onClick={handleLogin}>Entrar</button>
                  </div>
                )}

                {logged && ["DENIED", "REVERSED"].includes(upgraded) && (
                  <div className={styles.loginBox}>
                    <strong>Atualização</strong>
                    <img src="/icons/empty-folder.svg" alt="Premium" />
                    <p>
                      Atualização interrompida. Entre em contato para saber
                      mais.
                    </p>
                  </div>
                )}

                {logged && ["COMPLETED"].includes(upgraded) && (
                  <div className={styles.loginBox}>
                    <strong>Prioridade</strong>
                    <img src="/icons/premium.svg" alt="Premium" />
                    <p>Benefício do plano premium</p>
                  </div>
                )}

                {logged && ["PENDING"].includes(upgraded) && (
                  <div className={styles.loginBox}>
                    <strong>Atualização</strong>
                    <img src="/icons/processing-time.svg" alt="Premium" />
                    <p>
                      A atualização da sua conta para o plano Premium está em
                      andamento.
                    </p>
                    <button onClick={handleCheckout}>Andamento</button>
                  </div>
                )}

                <Form
                  ref={formRef}
                  className={`${styles.formBox} ${loggedStyle}`}
                  onSubmit={sendEmail}
                >
                  <div>
                    <label>Nome</label>
                    <Input name="name" defaultValue={name} readOnly={logged} />
                  </div>
                  <div>
                    <label>Email</label>
                    <Input
                      name="email"
                      defaultValue={email}
                      readOnly={logged}
                    />
                  </div>
                  <div>
                    <label>Mensagem</label>
                    <TextArea name="message" rows="3" />
                  </div>

                  <button type="submit">
                    {sending ? "Enviando" : "Enviar"}
                  </button>
                </Form>
              </div>
            </>
          )}

          {completed && (
            <>
              <h1>Mensagem enviada com sucesso</h1>
              <p>Responderemos o mais rápido possível</p>
              <button onClick={handleBack}>Voltar</button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  return {
    props: {
      appToken: process.env.NEXT_PUBLIC_APP_TOKEN,
    },
  };
};
