/* eslint-disable @next/next/next-script-for-ga */

import Head from 'next/head'

export function RegisterHead() {
  return (
    <Head>
      <title>Criar uma conta | Simplifiga</title>

      {/* SEO - ROBOTS */}
      <link rel="canonical" href="https://simplifi.ga/user/register/" />
      <meta name="title" content="Criar uma conta | Simplifiga" />
      <meta name="description" content="Crie uma conta e começe a encurtar agora com nossa API." />
      <meta name="robots" content="index, follow"/>
    </Head>
  )
}