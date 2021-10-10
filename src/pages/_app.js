import { ShortenerContextProvider } from '../contexts/Shortener'
import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
  <ShortenerContextProvider>
    <Component {...pageProps} />
    <Head>
        <link rel="canonical" href="https://simplifi.ga/" />
        <link rel="shortcut icon" href="/favicon.png"/>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="google-site-verification" content="QrL3AgdnXVfVbQtBBH0KSaKerIN1CGVcZ-78luRQdl4" />
        <link href="https://fonts.googleapis.com/css2?family=Sarala&display=swap" rel="stylesheet" />
        </Head>
  </ShortenerContextProvider>
  )
}

export default MyApp
