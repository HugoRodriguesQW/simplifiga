import errors from '../../errors.json'
import { database } from './database'

const handler = async (req, res) => {
  const {key, appToken, collection, data} = await JSON.parse(req.body)
  if(!key || !data || !appToken || !collection) return res.status(400).json(errors[400])
  if(appToken !== process.env.NEXT_PUBLIC_APP_TOKEN) return res.status(401).json(errors[401])

  await database.connect()
  const search = await database.find({collection, key, data})
  res.status(200).json({search})
}

export default handler