import { Database } from "./api/database";
import requestIp from "request-ip";
import iplocate from "node-iplocate";

export default function RedirectPage(props) {
  return <div>Destino não encontrado :(</div>;
}

export async function getServerSideProps({ query, req, res }) {
  const redirectId = query?.redirect;

  if (redirectId === "favicon.ico") return { props: {} };

  const db = new Database();
  await db.connect();

  let target = null;

  await fetch("https://simplifiga-api.herokuapp.com/" + redirectId, {
    headers: {
      authorization: process.env.NEXT_PUBLIC_API_TOKEN,
    },
  }).then(async (response) => {
    const result = await response.json();
    target = result.target;
  });

  if (target) {
    await generateAnalytics({
      req,
      redirectId,
    });

    return {
      redirect: {
        destination: target,
      },
    };
  }

  return {
    props: {
      id: redirectId,
    },
  };
}

async function generateAnalytics({ redirectId, req }) {
  const db = new Database();
  await db.connect();

  await db.addClick(redirectId);

  const localhostIp = ["127.0.0.1", "::1", "127.0.0.1", "::ffff:127.0.0.1"];
  const ip = requestIp.getClientIp(req);

  let referer = req.headers?.referer;

  if (referer) {
    await db.updateReferrer(referer, redirectId);
  }

  if (ip && ip !== "" && !localhostIp.includes(ip)) {
    return iplocate(ip).then((results) => {
      const [country, code, region] = [
        results.country,
        results.country_code,
        results.subdivision,
      ];
      return db.updateLocation({ country, region, code }, redirectId);
    });
  }
}
