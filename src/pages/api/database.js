import { MongoClient } from "mongodb"
import nc from 'next-connect'

let cachedDb = null
let databaseClient = null


export const database = {
  async connect() {
    const secret = process.env.MONGO_URI

    if(!databaseClient?.isConnected?.()) cachedDb = null
    if(cachedDb) return cachedDb

    databaseClient = await MongoClient.connect(secret, {
    useNewUrlParser: true, useUnifiedTopology: true })
    
    cachedDb = databaseClient.db('simplifiga')

    return cachedDb
  },

  async create (data){
    if(!data.link || !data.id)   return null

    const res = await cachedDb?.collection('links')?.insertOne(data)
    console.info("> DB: Create", data.id, 'Response:', res)
    return res
  },

  async getLink({id}) {
    if (!id) return null
    const query = {'id': id}
    const res = await cachedDb?.collection('links')?.findOne(query)

    console.info("> DB: Get", res)
    return res?.link ?? null
  },

  async has ({id}){
    const hasOnDatabase = 
    await cachedDb?.collection('links')?.findOne({'id': id}) != null
    return hasOnDatabase
  },
}

const handler = nc()
.post(async (req, res) => {
  try {
    await database.connect()
  } catch {
    res.json({'error': 'db-error-connect'})
    return
  }

  const body    = await JSON.parse(req.body)
  const {id, link, action} = body 
  const exec               = database[action]
  
  const NotRequirePermission = ['has', 'getLink', 'create']

  if(! NotRequirePermission.includes(action) ) res.json({'error': 'refused'})

  if(exec) {
    try {
      const response = await exec({id, link})
      res.json(response)
    } catch {
      res.json({'error': 'error-exec'})
    }
  }
})

export default handler