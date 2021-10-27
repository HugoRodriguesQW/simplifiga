/* eslint-disable @next/next/next-script-for-ga */

import Head from 'next/head'

export function ResetHead() {
  return (
    <Head>
      <title>Recuperação | Simplifiga</title>

      {/* SEO - ROBOTS */}
      <link rel="canonical" href="https://simplifi.ga/user/register/" />
      <meta name="title" content="Recuperação | Simplifiga" />
      <meta name="robots" content="no-index"/>
    </Head>
  )
}