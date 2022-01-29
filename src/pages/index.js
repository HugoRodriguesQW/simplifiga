/* eslint-disable @next/next/no-img-element */

import { MainComponent } from "../components/MainComponent";
import styles from "../styles/pages/Home.module.css";
import { Footer } from "../components/Footer";
import { IndexHead } from "../components/Head/IndexHead";
import { Logo } from "../components/Logo";
import { Header } from "../components/Header";
import Router from "next/router";
import { useContext } from "react";
import { userContext } from "../contexts/UserContext";
import Link from "next/link";
import router from "next/router";

export default function Home() {
  const { logged } = useContext(userContext);

  return (
    <>
      {logged ? (
        <Header
          fixed
          padding
          routes={["/dashboard", "/developer", "/pricing", "Sair"]}
        />
      ) : (
        <Header
          fixed
          padding
          routes={["/user/register", "/user/login", "/developer", "/pricing"]}
        />
      )}
      <div className={styles.container}>
        <IndexHead />
        <Logo type="full" />
        <MainComponent />
      </div>

      <div id="content" className={styles.contentBox}>
        <a href="#content" className={styles.scroll}>
          <img src="/icons/bx-mouse.svg" alt="mais" />
        </a>

        <h1>Encurtar links de forma simples e fácil!</h1>
        <p>
          A Simplifiga é uma plataforma de gerenciamento de links com foco na
          simplicidade. Para realizar um encurtamento rápido cole seu link no
          campo acima, defina um apelido (opcional) e clique em encurtar. Copie
          o link e deixe o resto com a Simplifiga.
        </p>

        <div className={styles.apiBox}>
          <div className={styles.apiContent}>
            <h3>Integração de API</h3>
            <p>
              Use nossa API para encurtar os links de forma direta em seus
              projetos. O processo é simples, rápido e gratuito. Basta
              registrar-se em nossa plataforma para obter um token de acesso
              único.
            </p>
          </div>
          <div>
            <button
              onClick={() => {
                Router.push("/developer");
              }}
            >
              API
            </button>
          </div>
        </div>

        <p>
          Você pode reduzir URLs longas e usá-las em posts, blogs, fórums,
          mensagens e outros. Esta plataforma é totalmente segura e permite
          tornar seus links pequenos e memoráveis. Veja mais detalhes na{" "}
          <Link href="/developer">documentação</Link> da API.
        </p>

        <h2>Benefícios do Simplifiga</h2>
        <p>
          Nossa plataforma foi pensada para ser leve e acessível em diversos
          dispositivos e navegadores. Simplicidade é nosso lema. Conseguimos
          fazer o redirecionamento em apenas <strong>780ms</strong>, enquanto
          outros levam até 1,41 segundos para redirecionar.
        </p>

        <div className={styles.benefitBox}>
          <div className={styles.benefit}>
            <img
              src="/icons/bxs-award.svg"
              loading="lazy"
              alt="Award"
              title="Award"
            />
            <h3>Simples</h3>
            <p>Links simples e memoráveis</p>
          </div>

          <div className={styles.benefit}>
            <img
              src="/icons/bxs-timer.svg"
              loading="lazy"
              alt="Timer"
              title="Timer"
            />
            <h3>Rápido</h3>
            <p>Redirecionamento em apenas 780ms</p>
          </div>

          <div className={styles.benefit}>
            <img
              src="/icons/analytics.svg"
              loading="lazy"
              alt="Analytics"
              title="Analytics"
            />
            <h3>Analytics</h3>
            <p>Entenda o acesso ao seu conteúdo</p>
          </div>

          <div className={styles.benefit}>
            <img
              src="/icons/bx-block.svg"
              loading="lazy"
              alt="Block"
              title="Block"
            />
            <h3>5 segundos</h3>
            <p>Sem telas de espera para exibir anúncios</p>
          </div>

          <div className={styles.benefit}>
            <img
              src="/icons/bxs-layout.svg"
              loading="lazy"
              alt="Simplifi.ga"
              title="Simplifiga"
            />
            <h3>Responsivo</h3>
            <p>Totalmente compatível com vários tamanhos de telas</p>
          </div>
        </div>

        <h2>Pronto para começar?</h2>
        <p>
          Crie uma conta gratuita e obtenha acesso ao nosso serviço de
          gerenciamento de links gratuito.
        </p>
        <button
          onClick={() => {
            router.push("/user/register");
          }}
          href="/user/register"
          className={styles.getStarted}
        >
          Vamos lá
        </button>
      </div>
      <Footer />
    </>
  );
}
