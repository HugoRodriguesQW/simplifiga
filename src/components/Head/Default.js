import Head from 'next/head'

export function DefaultHeadProps() {

  return ( 
    <Head>
      <link href="https://fonts.googleapis.com/css2?family=Sarala&display=swap" rel="stylesheet" />
 
      <link rel="alternate" type="application/xml" title="sitemap" href="https://simplifi.ga/api/my-sitemap" />
      
      <meta name="google-site-verification" content="QrL3AgdnXVfVbQtBBH0KSaKerIN1CGVcZ-78luRQdl4" />
      <meta httpEquiv='content-language' content='pt-br' />
      <meta httpEquiv="content-type"  content="text/html;charset=utf-8"></meta>
    </Head>
  )
}