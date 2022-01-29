import { Database } from "./database";

const handler = async (req, res) => {
  const auth = req.headers.authorization;
  const { tag } = await JSON.parse(req.body);

  if (
    auth !== process.env.NEXT_PUBLIC_APP_TOKEN ||
    req.method !== "POST" ||
    !tag
  )
    return res.json({});

  const db = new Database();
  await db.connect();

  let payload = {};
  await db.getUsage({ tag }).then(
    (data) => (payload = data),
    (error) => (payload = { error })
  );

  res.status(payload.error ? 400 : 200).json(payload);
};

export default handler;
