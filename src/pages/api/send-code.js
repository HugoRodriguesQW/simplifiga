import NextCors from "nextjs-cors";
import { ResetTools } from "../../utils/reset";
import { Database } from "./database";
import ResetEmail from "../../utils/mailshape";
import { getTransporter, googleOAuth, sendEmail } from "../../utils/mail";

const handler = async (req, res) => {
  await NextCors(req, res, {
    methods: ["POST"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  // Receive email to send
  const { email } = JSON.parse(req.body);

  if (!email) return res.status(400).json(onError(res, 400));

  const db = new Database();
  await db.connect();

  const { isEmailValid, generateCode } = await ResetTools(db);

  if (!(await isEmailValid(email)))
    return res.status(200).json({ sucess: true }); // false

  const code = await generateCode(email);

  if (!code) return res.status(400).json(onError(res, 400));

  sendEmail(
    {
      subject: "[Simplifiga] Recuperação de senha",
      text: ResetEmail(code).text,
      html: ResetEmail(code).html,
      email,
    },
    (err, info) => {
      if (err) {
        console.log("Error: send-code:", err);
        return res.status(200).json({ sucess: false });
      }

      if (info?.accepted?.includes(email)) {
        return res.status(200).json({ sucess: true });
      }

      return res.status(200).json({ sucess: false });
    }
  );
};

function onError(method, code) {
  return method.status(code).json(errors[code]);
}

export default handler;
