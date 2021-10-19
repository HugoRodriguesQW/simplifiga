/* eslint-disable @next/next/next-script-for-ga */

import Head from 'next/head'

export function IndexHead() {
  return (
    <>
    <Head>
      <title>Simplifiga | Encurtador de Links</title>    
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-209851230-1"></script>
      <script async type="text/javascript" src="/google.js"></script> 

      {/* SEO - ROBOTS */}
      <link rel="canonical" href="https://simplifi.ga/" />
      <meta name="title" content="Simplifiga | Encurtador de Links" />
      <meta name="description" content="Encurtador e Simplificador de URLs para torná-las memoráveis." />
      <meta name="robots" content="index, follow"/>

      {/* SEO - GOOGLE+ */}
      <meta itemProp="name" content="Simplifiga"/>
      <meta itemProp="description" content="Encurtador e Simplificador de URLs para torná-las memoráveis."/>
      <meta itemProp="image" content="https://simplifi.ga/banner.png"/>
    
      {/* SEO - FACEBOOK */}
      <meta property="og:url" content="https://simplifi.ga/"/>
      <meta property="og:site_name" content="Simplifiga" />
      <meta property="og:title" content="Encurtador de links"/>
      <meta property="og:description" content="Encurtador e Simplificador de URLs para torná-las memoráveis."/>
      <meta property="og:type" content="website"/>
      <meta property="og:image" content="https://simplifi.ga/banner.png"/>
      <meta property="og:image:type" content="image/png"/>
      <meta property="og:image:width" content="1200"/>
      <meta property="og:image:height" content="628"/>

      {/* SEO - TWITTER */}
      <meta property="twitter:url" content="https://simplifi.ga/"/>
      <meta property="twitter:card" content="summary_large_image"/>
      <meta property="twitter:title" content="Simplifiga"/>
      <meta property="twitter:description" content="Encurtador e Simplificador de URLs para torná-las memoráveis."/>
      <meta property="twitter:image" content="https://simplifi.ga/banner.png"/>
    </Head>
    </>
  )
}