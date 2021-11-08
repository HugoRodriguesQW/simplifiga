import { MongoClient } from "mongodb"
import { isValidUrl } from "../../utils/url"

export const database = {
  cachedDb: null,
  clientDb: null,
  async connect() {
    const secret = process.env.MONGO_URI

    if(this.cachedDb) {
      return this.cachedDb
    }

    this.clientDb = await MongoClient.connect(secret, {
    useNewUrlParser: true, useUnifiedTopology: true})
    this.cachedDb = this.clientDb.db('simplifiga')
    return this.cachedDb
  },

  async create (data){
    if(!data.link || !data.id)   return null

    const res = await this.cachedDb?.collection('links')?.insertOne(data)
    return res
  },

  async getLink({id}) {
    if (!id) return null
    const query = {'id': id}
    const res = await this.cachedDb?.collection('links')?.findOne(query)
    return res?.link ?? null
  },

  async has ({id}){
    const hasOnDatabase = 
    await this.cachedDb?.collection('links')?.findOne({'id': id}) != null
    return hasOnDatabase
  },

  async allWithParameter({name ,data, collection}) {
    const res =
    await this.cachedDb?.collection(collection).find({[name]: data})
    if(res) return res.toArray()
    return null
  },

  async validate({token}){
    const isValid = 
    await this.cachedDb?.collection('clients')?.findOne({'token': token}) != null
    return isValid
  },

  async addClient(data) {
    const res =
    await this.cachedDb?.collection('clients')?.insertOne(data)
    return res
  },

  async login ({email, password}) {
    const  user = 
    await this.cachedDb?.collection('clients')?.findOne({'email': email, 'password': password})
    return user
  },

  async createCode({email}) {
    const code = (Math.floor(100000 + Math.random() * 900000)).toString()

    this.cachedDb.collection('reset').createIndex( { "createdAt": 2 }, { expireAfterSeconds: 60*10 } )
    const res = await this.cachedDb.collection('reset').insertOne( {
      "createdAt": new Date(),
      'email': email,
      'code': code
   } )
   return res.acknowledged ? code : null
  },

  async validateCode({code, email}) {
    const isValid = 
    await this.cachedDb?.collection('reset')?.findOne({'email': email, 'code': code}) != null
    return isValid
  },

  async find({collection, key, data}) {
    const has = 
    await this.cachedDb?.collection(collection)?.findOne({[key] : data})
    return has ?? null
  },

  async addClick(id) {
    const res =  
    await this.cachedDb?.collection('links')?.updateOne(
      {'id': id},
      {$inc: {'clicks': 1}}
    )
    return res
  },

  async updateLocation(id, local) {
    try {
      console.info("Location acess:", local)
      const {origin} = await this.cachedDb?.collection('links')?.findOne({'id': id})
      const {locations} = await this.cachedDb?.collection('clients')?.findOne({'token': origin})
      const locExist = locations.filter(({country, regions}) => {
        const regExist = regions.filter(({name})=> {
          return name === local.region
        })[0] != null

        return local.country === country && regExist
      })[0] != null

      if(!locExist) {
        return await this.cachedDb?.collection('clients')?.updateOne(
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
        return await this.cachedDb?.collection('clients')?.updateOne(
        { "token": origin,
          "locations.country": local.country
        },
        { $inc: { "locations.$[].regions.$[region].clicks" : 1 } },
        {arrayFilters: [{
          "region.name": local.region
        }]}
      )
    } catch (err) {
      return console.info("Ocorreu um erro:", err)
    }

  },

  async updateReferrer(id, referer) {
    try {
      console.info("Referer Update", this.cachedDb, id, referer)
      referer = isValidUrl(referer) ? new URL(referer).host : referer
      const {origin} = await this.cachedDb?.collection('links')?.findOne({'id': id})
      const {references} = await this.cachedDb?.collection('clients').findOne({'token': origin})
      const refExist = references.filter(({ref}) => {
        return ref === referer
      })[0] != null

      if(!refExist) {
        return await this.cachedDb?.collection('clients')?.updateOne(
        {'token': origin},
        {$push: {
            references: {ref: referer, clicks: 1},
          }
        })
      }

      return await this.cachedDb?.collection('clients').updateOne(
        { "token": origin,
            "references.ref": referer
        },
        { $inc: { "references.$.clicks" : 1 } }
      )
    } catch (err) {
      return console.info("Um erro ocorreu:", err)
    }
  }
}