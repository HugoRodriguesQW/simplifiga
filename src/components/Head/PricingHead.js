/* eslint-disable @next/next/next-script-for-ga */

import Head from "next/head";
import { DefaultHeadProps } from "./Default";

export function PricingHead() {
  return (
    <>
      <Head>
        <title>Preços | Simplifiga</title>

        {/* SEO - ROBOTS */}
        <link rel="canonical" href="https://simplifi.ga/pricing/" />
        <meta name="title" content="Preços | Simplifiga" />
        <meta
          name="description"
          content="Planos, pacotes e preços de serviço da Simplifiga"
        />
        <meta name="robots" content="index, follow" />
      </Head>
      <DefaultHeadProps />
    </>
  );
}
