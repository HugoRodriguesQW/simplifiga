import NextCors from "nextjs-cors";
import { serverEncoder } from "../../utils/crypto";
import { ResetTools } from "../../utils/reset";
import { Database } from "./database";

const handler = async (req, res) => {
  await NextCors(req, res, {
    methods: ["POST"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  serverEncoder(async (server) => {
    // Receive email to send
    const { password, email, clientKey } = JSON.parse(server.decrypt(req.body));
    if (!password || !email) return res.json({ missing: true });

    const db = new Database();
    await db.connect();

    const { resetPassword } = await ResetTools(db);

    const msg = JSON.stringify({
      sucess: await resetPassword(password, email),
    });

    res.status(200).json({
      encrypted: server.encryptWithCustomKey(msg, clientKey),
    });
  });
};

export default handler;
