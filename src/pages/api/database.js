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
    useNewUrlParser: true, useUnifiedTopology: true})
    cachedDb = databaseClient.db('simplifiga')
    return cachedDb
  },

  async create (data){
    if(!data.link || !data.id)   return null

    const res = await cachedDb?.collection('links')?.insertOne(data)
    return res
  },

  async getLink({id}) {
    if (!id) return null
    const query = {'id': id}
    const res = await cachedDb?.collection('links')?.findOne(query)
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
  },

  async addClient(data) {
    const res =
    await cachedDb?.collection('clients')?.insertOne(data)
    return res
  },

  async login ({email, password}) {
    const  user = 
    await cachedDb?.collection('clients')?.findOne({'email': email, 'password': password})
    return user
  },

  async createCode({email}) {
    const code = (Math.floor(100000 + Math.random() * 900000)).toString()

    cachedDb.collection('reset').createIndex( { "createdAt": 2 }, { expireAfterSeconds: 60*10 } )
    const res = await cachedDb.collection('reset').insertOne( {
      "createdAt": new Date(),
      'email': email,
      'code': code
   } )
   return res.acknowledged ? code : null
  },

  async validateCode({code, email}) {
    const isValid = 
    await cachedDb?.collection('reset')?.findOne({'email': email, 'code': code}) != null
    return isValid
  },

  async find({collection, key, data}) {
    const has = 
    await cachedDb?.collection(collection)?.findOne({[key] : data})
    return has ?? null
  }
}