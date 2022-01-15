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
  await fetch(uri, {
    method: "GET",
    headers: new Headers({
      authorization: token,
    }),
  }).then(
    async (res) => {
      const data = await res.json();
      if (data.length > 0) callback(data);
    },
    () => errorCallback()
  );
}
