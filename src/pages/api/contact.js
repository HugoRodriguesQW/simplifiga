import { ContactServiceEmail, ContactEmail } from "../../utils/mailshape";
import { sendEmail } from "../../utils/mail";

const handler = (req, res) => {
  const { email, name, upgraded, logged, appToken, message } = JSON.parse(
    req.body
  );

  if (appToken !== process.env.NEXT_PUBLIC_APP_TOKEN)
    return res.status(401).json({ error: 401 });

  const translatedStatus = {
    COMPLETED: "Premium",
    PENDING: "Atualização",
    DENIED: "Negado",
    REVERSED: "Revertido",
  };

  if (upgraded) {
    const emailForm = ContactEmail({
      message,
      email,
      name,
      upgraded: translatedStatus[upgraded],
    });

    return sendEmail(
      {
        subject: `[${translatedStatus[upgraded]}] Contato Simplifiga`,
        text: emailForm.text,
        html: emailForm.html,
        email: "simplifiga@gmail.com",
        replyTo: email,
      },
      (err, info) => {
        if (err) {
          console.log("Error: send-code:", err);
          return res.status(200).json({ sucess: false });
        }

        if (info?.accepted?.includes("simplifiga@gmail.com")) {
          return res.status(200).json({ sucess: true });
        }

        return res.status(200).json({ sucess: false });
      }
    );
  }

  const emailForm = ContactServiceEmail({
    message,
    email,
    name,
    logged,
  });

  sendEmail(
    {
      subject: `[${logged ? "Serviço" : "Mensagem"}] Contato Simplifiga`,
      text: emailForm.text,
      html: emailForm.html,
      email: "simplifiga@gmail.com",
      replyTo: email,
    },
    (err, info) => {
      if (err) {
        console.log("Error: send-code:", err);
        return res.status(200).json({ sucess: false });
      }

      if (info?.accepted?.includes("simplifiga@gmail.com")) {
        return res.status(200).json({ sucess: true });
      }

      return res.status(200).json({ sucess: false });
    }
  );
};

export default handler;
