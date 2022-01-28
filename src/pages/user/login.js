import { useEffect, useRef, useState } from "react";
import styles from "../../styles/pages/Auth.module.css";
import { Form } from "@unform/web";
import Input from "../../components/Form/Input";
import * as Yup from "yup";
import Link from "next/link";
import { LoginHead } from "../../components/Head/LoginHead";
import { Header } from "../../components/Header";
import Router from "next/router";
import { clientEncoder } from "../../utils/crypto";
import { Finder } from "./register";

export default function Login({ serverKey, next }) {
  const acceptableNext = ["checkout", "dashboard", "pricing"];

  const formRef = useRef(null);
  const [processing, isProcessing] = useState(false);
  const [show, isShow] = useState(false);

  async function handleOnSubmit(data, { reset }) {
    if (processing) return;
    isProcessing(true);
    if (data.email) {
      clientEncoder(serverKey, async (client, server) => {
        try {
          const emailSearch = await Finder(
            { key: "email", data: data.email, collection: "clients" },
            client,
            server
          );

          const fields = Yup.object().shape({
            email: Yup.string()
              .email("Insira um endereço de e-mail válido")
              .oneOf([emailSearch], "Esta conta não existe")
              .required("Insira seu endereço de e-mail"),
            password: Yup.string().required("Insira uma senha de acesso"),
          });
          await fields.validate(data, { abortEarly: false });

          const login = await GetLogin(
            { email: data.email, password: data.password },
            client,
            server
          );

          const passwordSchema = Yup.object().shape({
            password: Yup.string().oneOf(
              [login?.password],
              "A senha está incorreta"
            ),
          });

          await passwordSchema.validate(data, { abortEarly: false });
          saveLogin(login);
          reset();
        } catch (error) {
          isProcessing(false);
          if (error instanceof Yup.ValidationError) {
            const errorMessages = {};
            error.inner.forEach((err) => {
              errorMessages[err.path] = err.message;
            });
            formRef.current.setErrors(errorMessages);
          }
        }
      });
    }
  }

  function saveLogin(login) {
    isProcessing(false);
    const date = new Date();
    date.setHours(date.getHours() + 24);
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: login.name,
        token: login.token,
        email: login.email,
        company: login.company,
        orderId: login.orderId ?? null,
        payee: login.payee ?? null,
        lifetime: date,
      })
    );

    Router.reload();
  }

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      if (acceptableNext.includes(next)) return Router.push("/" + next);
      return Router.push("/dashboard");
    }
    isShow(true);
  }, []);

  return (
    <>
      {show ? (
        <>
          <LoginHead />
          <Header routes={["/"]} padding />
          <div className={styles.container}>
            <div className={styles.contentBox}>
              <div>
                <h1>Conecte-se para usar nossos serviços</h1>
                <p>
                  Não tem uma conta?{" "}
                  <Link href="/user/register">Registre-se</Link>
                </p>
              </div>

              <Form
                onSubmit={handleOnSubmit}
                ref={formRef}
                className={styles.form}
              >
                <div>
                  <label>E-mail</label>
                  <Input name="email" />
                </div>
                <div>
                  <label>Senha</label>
                  <Input name="password" />
                </div>

                <div className={`${styles.submit} ${styles.withText}`}>
                  {processing ? (
                    <button className="active_button">Entrando</button>
                  ) : (
                    <button type="submit">Entrar</button>
                  )}
                  <p>
                    <Link href="/user/reset">Esqueceu a senha?</Link>
                  </p>
                </div>
              </Form>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

async function GetLogin({ email, password }, client, server) {
  let login = null;
  if (email && password) {
    const response = await fetch(`${window.location.origin}/api/login`, {
      method: "POST",
      body: server.encrypt(
        JSON.stringify({
          email,
          password,
          appToken: process.env.NEXT_PUBLIC_APP_TOKEN,
          clientKey: client.export(),
        })
      ),
    });

    try {
      const search = await response.json();
      if (search?.found === false) return;
      login = JSON.parse(client.decrypt(search.encrypted));
    } catch {
      login = null;
    }
  }
  return login;
}

export async function getServerSideProps({ query }) {
  return {
    props: {
      serverKey: process.env.PUBLIC_KEY,
      next: query?.next ?? null,
    },
  };
}
