import Head from 'next/head'
import MetaTags from 'react-meta-tags'

export function PrivacyHead() {
  return (
    <>
    <Head>
      <title>Privacidade & Termos – Simplifiga</title>
    </Head>
    
    <MetaTags>
      {/* SEO - ROBOTS */}
      <link rel="canonical" href="https://simplifi.ga/privacy" />
      <meta name="title" content="Privacidade & Termos – Simplifiga" />
      <meta name="description" content="Entenda a política de privacidade & termos de uso do Simplifiga"/>
      <meta name="robots" content="index, follow"/>
    </MetaTags>
    </>
  )
}