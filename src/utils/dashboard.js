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
  const resLoc = locations.flatMap((element) => [...element]);
  return sumArrayLocations(resLoc);
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
    if (data.length > 0) callback(data);
  });
}

function sumArrayLocations(locations) {
  const countries = [];
  locations.forEach(({ country, code }) => {
    if (countries.filter((c) => c.country === country).length !== 0) return;

    countries.push(
      locations
        .filter((c) => c.country === country)
        .reduce((a, b) => {
          const regions = b.regions.concat(a.regions);
          const resRegions = [];
          regions.forEach(({ name }) => {
            console.info("Resolving:", name);
            if (resRegions.filter((c) => c.name === name).length !== 0) return;
            resRegions.push(
              regions
                .filter((c) => c.name === name)
                .reduce((c, d) => {
                  return {
                    name,
                    clicks: c.clicks + d.clicks,
                  };
                })
            );
          });

          return {
            country,
            code,
            regions: resRegions,
          };
        })
    );
  });

  console.info(countries[0]);
  return countries;
}
