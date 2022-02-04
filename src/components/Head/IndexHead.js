/* eslint-disable @next/next/next-script-for-ga */

import Head from "next/head";
import { DefaultHeadProps } from "./Default";

export function IndexHead() {
  return (
    <>
      <Head>
        <title>Simplifiga | Encurtador e Gerenciador</title>

        {/* SEO - ROBOTS */}
        <link rel="canonical" href="https://simplifi.ga/" />
        <meta name="title" content="Simplifiga | Encurtador e Gerenciador" />
        <meta
          name="description"
          content="Encurtador de URL gratuito com nossa plataforma de gerenciamento de links. Crie, simplifique e compartilhe."
        />
        <meta name="robots" content="index, follow" />

        {/* SEO - GOOGLE+ */}
        <meta itemProp="name" content="Simplifiga" />
        <meta
          itemProp="description"
          content="Encurtador de URL gratuito com nossa plataforma de gerenciamento de links. Crie, simplifique e compartilhe."
        />
        <meta itemProp="image" content="https://simplifi.ga/banner.png" />

        {/* SEO - FACEBOOK */}
        <meta property="og:url" content="https://simplifi.ga/" />
        <meta property="og:site_name" content="Simplifiga" />
        <meta property="og:title" content="Encurtador de links" />
        <meta
          property="og:description"
          content="Encurtador de URL gratuito com nossa plataforma de gerenciamento de links. Crie, simplifique e compartilhe."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://simplifi.ga/banner.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="628" />

        {/* SEO - TWITTER */}
        <meta property="twitter:url" content="https://simplifi.ga/" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Simplifiga" />
        <meta
          property="twitter:description"
          content="Encurtador de URL gratuito com nossa plataforma de gerenciamento de links. Crie, simplifique e compartilhe."
        />
        <meta
          property="twitter:image"
          content="https://simplifi.ga/banner.png"
        />
      </Head>
      <DefaultHeadProps />
    </>
  );
}
