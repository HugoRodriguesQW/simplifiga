import { ShortenerContextProvider } from '../contexts/Shortener'
import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
  <ShortenerContextProvider>
    <Head>
        <link rel="canonical" href="https://simplifi.ga/" />
        <link rel="shortcut icon" href="/favicon.png"/>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <meta name="google-site-verification" content="QrL3AgdnXVfVbQtBBH0KSaKerIN1CGVcZ-78luRQdl4" />
        <link href="https://fonts.googleapis.com/css2?family=Sarala&display=swap" rel="stylesheet" />
    </Head>
    <Component {...pageProps} />
  </ShortenerContextProvider>
  )
}

export default MyApp
