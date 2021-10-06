import Head from 'next/head'
import { MainComponent } from '../components/MainComponent'
import styles from '../styles/pages/Home.module.css'
import { Error } from '../components/Error'

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Simplifi.ga</title>
        <link rel="shortcut icon" href="/favicon.png"/>
        <meta name="description" content="Simplifique seu link com Simplifi.ga" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Sarala&display=swap" rel="stylesheet" />
      </Head>

      <h1 className={styles.titleLogoImage}>
        <img src="/favicon.png" alt="Simplifi.ga"/>
        <span>Simplifi.ga</span>
      </h1>

      <MainComponent/>

      <Error/>
    </div>
  )
}
