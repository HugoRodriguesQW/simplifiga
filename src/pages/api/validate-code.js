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
  const {code, email} = JSON.parse(req.body)

  if(!code || !email) return res.json({missing: true, valid: false})
  
  const db = new Database()
  await db.connect()

 
  const {isCodeValid} = await ResetTools(db)

  if(! await isCodeValid(code, email)) return res.status(200).json({valid: false})
  await db.deleteCode({code, email})
  return res.status(200).json({valid: true})
}

export default handler