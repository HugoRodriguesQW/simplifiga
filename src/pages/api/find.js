import errors from '../../errors.json'
import { serverEncoder } from '../../utils/crypto'
import { database } from './database'

const handler = async (req, res) => {

  serverEncoder(async (server)=> {
    const {key, data, appToken, collection, clientKey} = JSON.parse(server.decrypt(req.body))
    if(!key || !data || !appToken || !collection || !clientKey) return res.status(400).json(errors[400])
    if(appToken !== process.env.NEXT_PUBLIC_APP_TOKEN) return res.status(401).json(errors[401])
  
    await database.connect()
    const search = await database.find({collection, key, data})
    if(search?.[key]) {
      return res.status(200).json({encrypted: server.encryptWithCustomKey(search[key], clientKey)})
    }
    return res.json({found: false})
  })
}

export default handler