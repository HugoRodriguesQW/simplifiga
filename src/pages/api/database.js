import { MongoClient } from "mongodb"
import { isValidUrl } from "../../utils/url"

let cachedDb = null
let clientDb = null
let timeout = null

export const database = {
  async connect() {
    const secret = process.env.MONGO_URI

    if(cachedDb) {
      clearTimeout(timeout)
      timeout = setTimeout(this.disconnect, 5000)
      return cachedDb
    }

    clientDb = await MongoClient.connect(secret, {
    useNewUrlParser: true, useUnifiedTopology: true})
    cachedDb = clientDb.db('simplifiga')

    timeout = setTimeout(this.disconnect, 5000)

    return cachedDb
  },

  async disconnect() {
    clientDb?.close()
    cachedDb = null
    clientDb = null
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

  async allWithParameter({name ,data, collection}) {
    const res =
    await cachedDb?.collection(collection).find({[name]: data})
    if(res) return res.toArray()
    return null
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
  },

  async addClick(id) {
    console.info("Add click +1")
    await cachedDb?.collection('links').updateOne(
      {'id': id},
      {$inc: {'clicks': 1}}
    )
  },

  async updateLocation(id, local) {
    try {
      const {origin} = await cachedDb?.collection('links')?.findOne({'id': id})
      const {locations} = await cachedDb?.collection('clients').findOne({'token': origin})
      const locExist = locations.filter(({country, regions}) => {
        const regExist = regions.filter(({name})=> {
          return name === local.region
        })[0] != null

        return local.country === country && regExist
      })[0] != null

      if(!locExist) {
        return await cachedDb?.collection('clients')?.updateOne(
        {'token': origin},
        {$push: {
            locations: {
              'country': local.country,  
              'regions': [
                {'name': local.region, clicks: 1}
              ]
            }
          }
        })
      }
      
      return await cachedDb?.collection('clients').updateOne(
        { "token": origin,
          "locations.country": local.country
        },
        { $inc: { "locations.$[].regions.$[region].clicks" : 1 } },
        {arrayFilters: [{
          "region.name": local.region
        }]}
      )
    } catch (err) {
      console.info("Ocorreu um erro:", err)
    }

  },

  async updateReferrer(id, referer) {
    try {
      referer = isValidUrl(referer) ? new URL(referer).host : referer
      const {origin} = await cachedDb?.collection('links')?.findOne({'id': id})
      const {references} = await cachedDb?.collection('clients').findOne({'token': origin})
      const refExist = references.filter(({ref}) => {
        return ref === referer
      })[0] != null

      if(!refExist) {
        return await cachedDb?.collection('clients')?.updateOne(
        {'token': origin},
        {$push: {
            references: {ref: referer, clicks: 1},
          }
        })
      }

      return await cachedDb?.collection('clients').updateOne(
        { "token": origin,
            "references.ref": referer
        },
        { $inc: { "references.$.clicks" : 1 } }
      )
    } catch (err) {
      console.info("Um erro ocorreu:", err)
    }
  }
}