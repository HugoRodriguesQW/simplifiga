import nc from 'next-connect'
import { database } from './database'

class ResponseError {
  constructor (code) {
    this.errorText = [
      'Parameters were not passed correctly.',
      'The informed token is not valid.',
      'The informed nick is not valid.',
      'Unable to generate a nickname.'
    ][(code/1000)-1]
    this.reference = code
  }
}

const ShortenerApiHandler = nc()
.post( async (request, response) => {

  const {longUrl, token, nickname} = await JSON.parse(request.body)
  let nick = nickname

  console.log('> API: Receive a new request.')

  if(!longUrl ||  !token) {
    response.status(400).json(new ResponseError(1000))
    return
  }

  await database.connect()

  const isTokenValid = await database.validate({token})

  if(!isTokenValid) {
    response.status(401).json(new ResponseError(2000))
    return
  }

  if(nick) {
     const isValid = await validatenick(nick)
     if(!isValid) {
       response.status(422).json(new ResponseError(3000))
       return
     }
  }

  if (!nick) {
    nick = await generatenick()
    if(!nick){
      response.status(500).json(new ResponseError(4000))
      return
    }
  } 

  const shortened = await database.create({id: nick, link: longUrl})

  response.json({
    target: longUrl,
    shortened: `https://simplifi.ga/${nick}`
  })
  
})

async function generatenick() {
  
    let validNick = null
    const tries = new Array(5).fill(0)

    await Promise.all(tries.map(async () => {
      const nick = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 4)
      const isValid = await validatenick(nick)
      if(isValid) {
        validNick = nick
        return false
      }
      return true
    }))

    if(validNick) return validNick
}

async function validatenick(nick) {
  const hasOnDatabase = await database.has({id: nick})
  return !hasOnDatabase
}

export default ShortenerApiHandler