import { ClientRSA } from "./crypto";

export function countLinkClicks(links) {
  return links && links.length === 0
    ? 0
    : links.reduce((b, c) => {
        return { clicks: parseInt(b.clicks) + parseInt(c.clicks) };
      })?.clicks;
}

export function filterReferences(links) {
  const references = links && links.map((link) => link.references);
  return references.flatMap((element) => [...element]);
}

export function filterLocations(links) {
  const locations = links && links.map((link) => link.locations);
  return locations.flatMap((element) => [...element]);
}

export async function getAllDataFromAPI([token, uri], callback) {
  const client = new ClientRSA({ bits: 1024 });
  await fetch(uri, {
    method: "GET",
    headers: {
      authorization: token,
      "x-api-key": client.export(),
    },
  }).then(async (res) => {
    const decrypted = client.decrypt(await res.text());
    const data = JSON.parse(decrypted);
    console.info(data);
    if (data.length > 0) callback(data);
  });
}
