import NextCors from "nextjs-cors"
import { ResetTools } from "../../utils/reset"
import {Database} from './database'
import nodemailer from 'nodemailer'
import {google} from 'googleapis'


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

  const oAuth2 = new google.auth.OAuth2(process.env.G_ID, process.env.G_SECRET, process.env.REDIRECT_TO)
  oAuth2.setCredentials({refresh_token: process.env.R_TOKEN})

  const acessToken = await oAuth2.getAccessToken()

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.APP_EMAIL,
      clientId: process.env.G_ID,
      clientSecret: process.env.G_SECRET,
      refreshToken: process.env.R_TOKEN,
      accessToken: acessToken
    }
    });

  const mailOptions = {
    from: 'SIMPLIFIGA <mailvitorhugosr@gmail.com>',
    to: email,
    subject: '[Simplifiga] Recuperação de conta',
    text: `Se não foi você que requisitou verifique sua conta. Este é o código de recuperação de senha: ${code}. Atenção: este código expira em 10 minutos.`,
    html: `<h1>Se não foi você que requisitou verifique sua conta. Este é o código de recuperação de senha: ${code}. Atenção: este código expira em 10 minutos.</h1>`
  };
  
  
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