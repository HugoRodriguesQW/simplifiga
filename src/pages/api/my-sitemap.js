const { SitemapStream, streamToPromise } = require("sitemap");
const { Readable } = require("stream");

import database from './database'

const handler = async (req, res) => {

  const links = [
    { url: "", changefreq: "daily", priority: 1 },
  ];


  const stream = new SitemapStream({ hostname: `https://${req.headers.host}` });

  res.writeHead(200, {
    "Content-Type": "application/xml",
  });

  const xmlString = await streamToPromise(
    Readable.from(links).pipe(stream)
  ).then((data) => data.toString());

  res.end(xmlString);
};

export default handler