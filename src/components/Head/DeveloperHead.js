/* eslint-disable @next/next/next-script-for-ga */

import Head from 'next/head'

export function DeveloperHead() {
  return (
    <Head>
      <title>API | Simplifiga</title>

      {/* SEO - ROBOTS */}
      <link rel="canonical" href="https://simplifi.ga/developer/" />
      <meta name="title" content="API | Simplifiga" />
      <meta name="description" content="Documentação da API da Simplifiga e métodos de utilização." />
      <meta name="robots" content="index, follow"/>
    </Head>
  )
}