/* eslint-disable @next/next/next-script-for-ga */
/* eslint-disable @next/next/no-img-element */

import Head from 'next/head'
import { MainComponent } from '../components/MainComponent'
import styles from '../styles/pages/Home.module.css'
import { Error } from '../components/Error'
import { Footer } from '../components/Footer'

export default function Home() {


  return (
    <>
    <div className={styles.container}>
      <Head>
        <title>Simplifiga | Encurtador de Links</title>
        <meta name="title" content="Simplifiga" />
        <meta name="description" content="Encurtador e Simplificador de URLs para torná-las memoráveis." />
        <meta name="robots" content="index, follow"/>

        { /* SEO TAG */ }
        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://simplifi.ga/"/>
        <meta property="og:title" content="Simplifiga"/>
        <meta property="og:description" content="Encurtador e Simplificador de URLs para torná-las memoráveis."/>
        <meta property="og:image" content="https://raw.githubusercontent.com/HugoRodriguesQW/simplifiga/main/banner.png"/>
        <meta property="og:url" content="https://simplifi.ga/" />
        <meta property="og:site_name" content="Simplifiga" />

        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content="https://simplifi.ga/"/>
        <meta property="twitter:title" content="Simplifiga"/>
        <meta property="twitter:description" content="Encurtador e Simplificador de URLs para torná-las memoráveis."/>
        <meta property="twitter:image" content="https://raw.githubusercontent.com/HugoRodriguesQW/simplifiga/main/banner.png"/>

        { /* Google Analytics */ }
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-209851230-1">
        </script>
        <script async type="text/javascript" src="/google.js">
        </script>
        
      </Head>

      <h1 className={styles.titleLogoImage}>
        <img src="/favicon.png" loading="lazy" alt="Simplifi.ga" title="Simplifiga"/>
        <span>Simplifi.ga</span>
      </h1>

      <MainComponent/>

      <Error/>
    </div>

    <div id="content" className={styles.contentBox}>
        <h2>Encurtar links de forma simples e fácil!</h2>
        <p>
          O Simplifiga é um encurtador de links longos tornando-os simples, curtos e memoráveis. Cole seu link completo, defina um apelido para o link (opicional) e clique em encurtar. Agora é só copiar o link simplificado e deixar o resto com o Simplifiga.
        </p>
        <p>
          Você pode reduzir URLs longas e usá-las em posts, blogs, fórums, mensagens e outros. Esta plataforma é totalmente segura e permite tornar seus links pequenos e memoráveis.
        </p>

        <h2>Benefícios do Simplifiga</h2>
        <p>
          Nossa plataforma foi pensada para ser leve e acessível em diversos dispositivos e navegadores. Simplicidade é nosso lema. Conseguimos fazer o redirecionamento em apenas 780ms, enquanto outros levam até 1,41 segundos para redirecionar.
        </p>
        <p>
          Apenas exibimos anúncios durante o encurtamento com o objetivo de reduzir o tempo de redirecionamento. Sem telas, sem mensagens, rápido e direto.
        </p>

        <div className={styles.benefitBox}>
          <div className={styles.benefit}>
            <img src="/icons/bxs-award.svg" loading="lazy" alt="Award" title="Award"/>
            <h3>Simples</h3>
            <p>Links simples e memoráveis</p>
          </div>

          <div className={styles.benefit}>
            <img src="/icons/bxs-timer.svg" loading="lazy" alt="Timer" title="Timer"/>
            <h3>Rápido</h3>
            <p>Redirecionamento em apenas 780ms</p>
          </div>

          <div className={styles.benefit}>
            <img src="/icons/bxs-badge-dollar.svg" loading="lazy" alt="Dollar" title="Dollar"/>
            <h3>Grátis</h3>
            <p>Quando quiser e sempre que quiser</p>
          </div>

          <div className={styles.benefit}>
            <img src="/icons/bx-block.svg" loading="lazy" alt="Simplifi.ga" title="Simplifiga"/>
            <h3>5 segundos</h3>
            <p>Sem telas de espera para exibir anúncios</p>
          </div>

          <div className={styles.benefit}>
            <img src="/icons/bxs-layout.svg" loading="lazy" alt="Simplifi.ga" title="Simplifiga"/>
            <h3>Responsivo</h3>
            <p>Totalmente compatível com vários tamanhos de telas</p>
          </div>
        </div>
    </div>
    <Footer/>

    { /* InfoLinks Ads Service */}
    <script type="text/javascript"> var infolinks_pid = 3347327; var infolinks_wsid = 0; </script> 
    <script async type="text/javascript" src="//resources.infolinks.com/js/infolinks_main.js"></script>
    </>
    
  )
}
