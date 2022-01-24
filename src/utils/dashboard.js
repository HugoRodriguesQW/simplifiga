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
  return sumArrayReferences(references.flatMap((element) => [...element]));
}

export function filterLocations(links) {
  const locations = links && links.map((link) => link.locations);
  return sumArrayLocations(locations.flatMap((element) => [...element]));
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

  return countries.map(({ code, country, regions }) => {
    return {
      code,
      country,
      regions: regions.map((region) => {
        if (region.name) return region;
        return {
          name: "Região Desconhecida",
          clicks: region.clicks,
        };
      }),
    };
  });
}

export function sumArrayReferences(references) {
  const resRef = [];
  references.forEach(({ ref }) => {
    if (resRef.filter((c) => c.ref === ref).length !== 0) return;
    resRef.push(
      references
        .filter((c) => {
          return c.ref === ref;
        })
        .reduce((a, b) => {
          return {
            ref,
            clicks: a.clicks + b.clicks,
          };
        })
    );
  });
  return resRef;
}
