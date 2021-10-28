import errors from '../../errors.json'
import { database } from './database'

const handler = async (req, res) => {
  const {name, password, email, company, appToken} = await JSON.parse(req.body)
  if(!name || !password || !email || !company || !appToken) return res.status(400).json(errors[400])
  if(appToken !== process.env.NEXT_PUBLIC_APP_TOKEN) return res.status(401).json(errors[401])

  await database.connect()
  database.addClient({
    name,
    email,
    company,
    password,
    token:`${Math.random().toString(32).substring(2)}${Math.random().toString(19).substring(2)}`,
    createdAt: new Date(),
  })
  res.end()
}

export default handler