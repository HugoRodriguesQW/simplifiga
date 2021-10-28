import errors from '../../errors.json'
import { database } from './database'
const handler = async (req, res) => {
  const {password, email, appToken} = await JSON.parse(req.body)
  if(!password || !email || !appToken) return res.status(400).json(errors[400])
  if(appToken !== process.env.NEXT_PUBLIC_APP_TOKEN) return res.status(401).json(errors[401])

  await database.connect()
  const user = await database.login({email, password})
  if(user){
    return res.status(200).json({...user, loginStatus: true})
  }
  res.json({loginStatus:false})
}

export default handler