/* eslint-disable @next/next/no-page-custom-font */

import { ShortenerContextProvider } from '../contexts/Shortener'
import Head from 'next/head'
import '../styles/globals.css'
import { useEffect, useState } from 'react'

function MyApp({ Component, pageProps }) {

  const [isLogged, setIsLogged] = useState(false)

  useEffect(()=> {
    const user = localStorage.getItem('user')
    if(user) setIsLogged(true)
  },[])

  return (
  
  <ShortenerContextProvider>
    <Component logged={isLogged} {...pageProps} />
    <Head>
      <link href="https://fonts.googleapis.com/css2?family=Sarala&display=swap" rel="stylesheet" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="shortcut icon" href="/favicon.ico"type="image/x-icon"/>
      <link rel="alternate" type="application/xml" title="sitemap" href="https://simplifi.ga/api/my-sitemap" />
      
      <meta name="google-site-verification" content="QrL3AgdnXVfVbQtBBH0KSaKerIN1CGVcZ-78luRQdl4" />
      <meta httpEquiv='content-language' content='pt-br' />
      <meta httpEquiv="content-type"  content="text/html;charset=utf-8"></meta>
    </Head>
  </ShortenerContextProvider>
  )
}

export default MyApp
