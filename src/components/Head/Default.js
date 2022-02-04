import Head from "next/head";

export function DefaultHeadProps() {
  return (
    <Head>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-8658L9EKK1"
      ></script>
      <script async type="text/javascript" src="/google.js"></script>

      <link
        href="https://fonts.googleapis.com/css2?family=Sarala&display=swap"
        rel="stylesheet"
      />

      <link
        rel="alternate"
        type="application/xml"
        title="sitemap"
        href="https://simplifi.ga/api/my-sitemap"
      />

      <meta httpEquiv="content-language" content="pt-br" />
      <meta httpEquiv="content-type" content="text/html;charset=utf-8"></meta>
    </Head>
  );
}
