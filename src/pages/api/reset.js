import NextCors from "nextjs-cors"
import { ResetTools } from "../../utils/reset"
import {Database} from './database'

const handler = async (req, res) => {

  await NextCors(req, res, {
  methods: ["POST"],
    origin: "*",
    optionsSuccessStatus: 200,
  })

  // Receive email to send
  const {password, email} = JSON.parse(req.body)

  console.info(password, email)
  if(!password || !email) return res.json({missing: true})
  
  const db = new Database()
  await db.connect()

 
  const {resetPassword} = await ResetTools(db)

  const sucess = await resetPassword(password, email)
  return res.status(200).json({sucess})
}

export default handler