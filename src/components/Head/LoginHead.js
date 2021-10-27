/* eslint-disable @next/next/next-script-for-ga */

import Head from 'next/head'

export function LoginHead() {
  return (
    <Head>
      <title>Login | Simplifiga</title>

      {/* SEO - ROBOTS */}
      <link rel="canonical" href="https://simplifi.ga/user/login/" />
      <meta name="title" content="Login | Simplifiga" />
      <meta name="description" content="Entre para acessar nosso serviços" />
      <meta name="robots" content="index, follow"/>
    </Head>
  )
}