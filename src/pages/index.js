import Head from 'next/head'
import { MainComponent } from '../components/MainComponent'
import styles from '../styles/pages/Home.module.css'
import { Error } from '../components/Error'

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>

        <title>Simplifiga</title>
        <meta name="title" content="Simplifiga" />
        <meta name="description" content="Encurtador e Simplificador de URLs para torná-las memoráveis." />
        <meta name="robots" content="index, follow"/>
        <link rel="canonical" href="https://simplifi.ga/" />

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
      </Head>

      <h1 className={styles.titleLogoImage}>
        <img src="/favicon.png" loading="lazy" alt="Simplifi.ga" title="Simplifiga"/>
        <span>Simplifi.ga</span>
      </h1>

      <MainComponent/>

      <Error/>
    </div>
  )
}
