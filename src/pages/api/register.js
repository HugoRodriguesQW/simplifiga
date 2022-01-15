import errors from "../../errors.json";
import { serverEncoder } from "../../utils/crypto";
import { Database } from "./database";

const handler = async (req, res) => {
  serverEncoder(async (server) => {
    const { name, password, email, company, appToken } = await JSON.parse(
      server.decrypt(req.body)
    );
    if (!name || !password || !email || !company || !appToken)
      return res.status(400).json(errors[400]);
    if (appToken !== process.env.NEXT_PUBLIC_APP_TOKEN)
      return res.status(401).json(errors[401]);

    const db = new Database();
    await db.connect();

    db.addClient({
      name,
      email,
      company,
      password,
      deleted: 0,
      locations: [],
      references: [],
      createdAt: new Date(),
      token: `${Math.random().toString(32).substring(2)}${Math.random()
        .toString(19)
        .substring(2)}`,
    });
    res.end();
  });
};

export default handler;
