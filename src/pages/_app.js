/* eslint-disable @next/next/no-page-custom-font */

import { ShortenerContextProvider } from '../contexts/Shortener'
import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
  <ShortenerContextProvider>
    <Component {...pageProps} />
    <Head>
        <link rel="shortcut icon" href="/favicon.png"/>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link href="https://fonts.googleapis.com/css2?family=Sarala&display=swap" rel="stylesheet" />
        <meta name="google-site-verification" content="QrL3AgdnXVfVbQtBBH0KSaKerIN1CGVcZ-78luRQdl4" />
        <meta httpEquiv='content-language' content='pt-br' />
        </Head>
  </ShortenerContextProvider>
  )
}

export default MyApp
