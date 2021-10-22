import { MongoClient } from "mongodb"

let cachedDb = null
let databaseClient = null


export const database = {
  async connect() {
    const secret = process.env.MONGO_URI

    if(cachedDb) {
      return cachedDb
    }
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

  async validate({token}){
    const isValid = 
    await cachedDb?.collection('clients')?.findOne({'token': token}) != null
    return isValid
  }
}