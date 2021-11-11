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
    return {
      redirectUrl: res?.link ?? null,
      origin: res?.origin ?? null
    }
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

    const date = new Date()

    date.setMinutes(date.getMinutes()+10)

    await this.db.collection('reset').createIndex( { "expireAt": 1 }, { expireAfterSeconds: 0 } )
    const res = await this.db.collection('reset').insertOne( {
      "expireAt": date,
      "logEvent": 1,
      "logMessage": "Success!",
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

  async deleteCode({code, email}) {
    const res =
    await this.db.collection('reset').deleteOne( {code, email})
    return res
  }

  async updateUserData({data, filter}) {
    const res = 
    await this.db.collection('clients').updateOne({...filter},
      {$set: {...data}}
    )
    return res.modifiedCount === 1
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

  async updateLocation(id, local, origin) { // {country, code, region}
    try {
      console.log(`<<< LOCATION >>> origin: ${origin}, local: ${local.country}, id: ${id} <<<`)
      if(!origin) return
      const locations = await this.db?.collection('clients')?.findOne({'token': origin})?.locations
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
              'code': local.code,
              'regions': [
                {'name': local.region, clicks: 1}
              ]
            }
          }
        })
      }
        return await this.db?.collection('clients')?.updateOne(
        { "token": origin,
          "locations.country": local.country,
          'locations.code': local.code
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

  async updateReferrer(id, referer, origin) {
    try {
      console.log(`<<< REFERRER >>> origin: ${origin}, referer: ${referer}, id: ${id} <<<`)
      if(!origin) return
      const references = await this.db?.collection('clients').findOne({'token': origin})?.references
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