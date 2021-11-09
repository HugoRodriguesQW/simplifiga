/* eslint-disable @next/next/next-script-for-ga */

import Head from 'next/head'
import { DefaultHeadProps } from './Default'

export function ResetHead() {
  return (
    <>
    <Head>
      <title>Recuperação | Simplifiga</title>

      {/* SEO - ROBOTS */}
      <meta name="title" content="Recuperação | Simplifiga" />
      <meta name="robots" content="no-index"/>
    </Head>
    <DefaultHeadProps/>
    </>
  )
}