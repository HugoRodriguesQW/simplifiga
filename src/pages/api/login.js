import errors from '../../errors.json'
import { serverEncoder } from '../../utils/crypto'
import { Database } from './database'

const handler = async (req, res) => {

  serverEncoder( async (server)=> {
    const {password, email, appToken, clientKey} =  JSON.parse(server.decrypt(req.body))
    if(!password || !email || !appToken || !clientKey) return res.status(400).json(errors[400])
    if(appToken !== process.env.NEXT_PUBLIC_APP_TOKEN) return res.status(401).json(errors[401])

    const db =  new Database()
    await db.connect()
    
    const user = await db.login({email, password})
    if(user){
      const userData = server.encryptWithCustomKey(JSON.stringify({...user, loginStatus: true}), clientKey)
      return res.status(200).json({encrypted: userData})
    }
    res.json({found: false})
  })
}

export default handler