/* eslint-disable @next/next/next-script-for-ga */

import Head from "next/head";
import { DefaultHeadProps } from "./Default";

export function SupportHead() {
  return (
    <>
      <Head>
        <title>Suporte | Simplifiga</title>

        {/* SEO - ROBOTS */}
        <link rel="canonical" href="https://simplifi.ga/developer/" />
        <meta name="title" content="Suporte | Simplifiga" />
        <meta name="description" content="Contato e Suporte Simplifiga" />
        <meta name="robots" content="index, follow" />
      </Head>
      <DefaultHeadProps />
    </>
  );
}
