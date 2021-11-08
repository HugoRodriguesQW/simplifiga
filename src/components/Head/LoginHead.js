/* eslint-disable @next/next/next-script-for-ga */

import Head from 'next/head'
import { DefaultHeadProps } from './Default'

export function LoginHead() {
  return (
    <>
    <Head>
      <title>Login | Simplifiga</title>

      {/* SEO - ROBOTS */}
      <meta name="title" content="Login | Simplifiga" />
      <meta name="description" content="Entre para acessar nosso serviços de gerenciamento de links gratuito." />
      <meta name="robots" content="index, follow"/>
    </Head>
    <DefaultHeadProps/>
    </>
  )
}