import NextCors from "nextjs-cors"
import { ResetTools } from "../../utils/reset"
import {Database} from './database'
import nodemailer from 'nodemailer'

const handler = async (req, res) => {

  await NextCors(req, res, {
  methods: ["POST"],
    origin: "*",
    optionsSuccessStatus: 200,
  })

  // Receive email to send
  const {email} = JSON.parse(req.body)

  if(!email) return res.status(400).json(onError(res, 400))
  
  const db = new Database()
  await db.connect()

  const {isEmailValid, generateCode} = await ResetTools(db)

  if(! await isEmailValid(email)) return res.status(200).json({sucess: false})

  const code = await generateCode(email)
 
  if(!code) return res.status(400).json(onError(res, 400))

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_EMAIL_PASS
    }
    });

  const mailOptions = {
    from: 'mailvitorhugosr@gmail.com',
    to: email,
    subject: '[Simplifiga] Recuperação de conta',
    text: `Se não foi você que requisitou verifique sua conta. Este é o código de recuperação de senha: ${code}. Atenção: este código expira em 10 minutos.`
  };
  
  console.log("Log: send-code:", email)

  transporter.sendMail(mailOptions, (err, info) => {
    if(err) {
      console.log("Error: send-code:", err)
      return res.status(200).json({sucess: false})
    } 

    if(info?.accepted?.includes(email)){
      return res.status(200).json({sucess: true})
    }

    return res.status(200).json({sucess: false})
  })
}

function onError(method, code) {
  return method.status(code).json(errors[code])
}

export default handler