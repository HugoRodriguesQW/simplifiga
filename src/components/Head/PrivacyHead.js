import Head from 'next/head'
import { DefaultHeadProps } from './Default'

export function PrivacyHead() {
  return (
    <>
    <Head>
      <title>Privacidade & Termos – Simplifiga</title>

      {/* SEO - ROBOTS */}
      <meta name="title" content="Privacidade & Termos – Simplifiga" />
      <meta name="description" content="Entenda a política de privacidade & termos de uso da Simplifiga"/>
      <meta name="robots" content="index, follow"/>
    </Head>
    <DefaultHeadProps/>
    </>
  )
}