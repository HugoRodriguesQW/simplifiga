import { MongoClient } from "mongodb"
import { isValidUrl } from "../../utils/url"

let cachedDb = null
let cachedCl = null

export class Database {
  constructor() {
    this.db = cachedDb
    this.cl = cachedCl
  }

  async connect() {
    const secret = process.env.MONGO_URI

    if(this.db && this.cl) {
      console.info("DB: cached.")
      return this
    }

    console.info("DB: new connection.")

    cachedCl = await MongoClient.connect(secret, {
    useNewUrlParser: true, useUnifiedTopology: true})
    cachedDb = cachedCl.db('simplifiga')

    this.db = cachedDb
    this.cl = cachedCl
    return this
  }

  async create (data){
    if(!data.link || !data.id)   return null

    const res = await this.db?.collection('links')?.insertOne(data)
    return res
  }

  async getLink({id}) {
    if (!id) return null
    const query = {'id': id}
    const res = await this.db?.collection('links')?.findOne(query)
    return res?.link ?? null
  }

  async has ({id}){
    const hasOnDatabase = 
    await this.db?.collection('links')?.findOne({'id': id}) != null
    return hasOnDatabase
  }

  async allWithParameter({name ,data, collection}) {
    const res =
    await this.db?.collection(collection).find({[name]: data})
    if(res) return res.toArray()
    return null
  }

  async validate({token}){
    const isValid = 
    await this.db?.collection('clients')?.findOne({'token': token}) != null
    return isValid
  }

  async addClient(data) {
    const res =
    await this.db?.collection('clients')?.insertOne(data)
    return res
  }

  async login ({email, password}) {
    const  user = 
    await this.db?.collection('clients')?.findOne({'email': email, 'password': password})
    return user
  }

  async createCode({email}) {
    const code = (Math.floor(100000 + Math.random() * 900000)).toString()

    cachedDb.collection('reset').createIndex( { "createdAt": 2 }, { expireAfterSeconds: 60*10 } )
    const res = await this.db.collection('reset').insertOne( {
      "createdAt": new Date(),
      'email': email,
      'code': code
   } )
   return res.acknowledged ? code : null
  }

  async validateCode({code, email}) {
    const isValid = 
    await this.db?.collection('reset')?.findOne({'email': email, 'code': code}) != null
    return isValid
  }

  async find({collection, key, data}) {
    const has = 
    await this.db?.collection(collection)?.findOne({[key] : data})
    return has ?? null
  }

  async addClick(id) {
    const res =  
    await this.db?.collection('links')?.updateOne(
      {'id': id},
      {$inc: {'clicks': 1}}
    )
    return res
  }

  async updateLocation(id, local) {
    try {
      const {origin} = await this.db?.collection('links')?.findOne({'id': id})
      const {locations} = await this.db?.collection('clients')?.findOne({'token': origin})
      const locExist = locations.filter(({country, regions}) => {
        const regExist = regions.filter(({name})=> {
          return name === local.region
        })[0] != null

        return local.country === country && regExist
      })[0] != null

      if(!locExist) {
        return await this.db?.collection('clients')?.updateOne(
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
        return await this.db?.collection('clients')?.updateOne(
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

  }

  async updateReferrer(id, referer) {
    try {
      referer = isValidUrl(referer) ? new URL(referer).host : referer
      const {origin} = await this.db?.collection('links')?.findOne({'id': id})
      const {references} = await this.db?.collection('clients').findOne({'token': origin})
      const refExist = references.filter(({ref}) => {
        return ref === referer
      })[0] != null

      if(!refExist) {
        return await this.db?.collection('clients')?.updateOne(
        {'token': origin},
        {$push: {
            references: {ref: referer, clicks: 1},
          }
        })
      }

      return await this.db?.collection('clients').updateOne(
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