import { insertOnDatabase, randomNickname, validateNick, validateToken } from '../../../utils/shortener'
import errors from '../../../errors.json'
import NextCors from "nextjs-cors";
import { database } from '../database';

const handler = async (req, res) => {

  await NextCors(req, res, {
  methods: ["POST"],
    origin: "*",
    optionsSuccessStatus: 200,
  })

  switch(req.method){
  case 'POST': 

    const params = await JSON.parse(req.body)
    const url = params.url
    const token = params.token
    let   nick = params.nick

    if(!url ||  !token) {
      return onError(res, 400)
    }

    await database.connect()

    if( await validateToken(token) === false) {
      return onError(res, 401)
    }

    if(nick) {
      const isValid = await validateNick(nick)
      if(!isValid) {
        return onError(res, 422)
      }
    }

    if (!nick) {
      nick = await randomNickname()
      if(!nick){
        return onError(res, 500)
      }
    }

    await insertOnDatabase({nick, url})

    res.json({
      url,
      shortened: `https://simplifi.ga/${nick}`
    })
    break
    
  default:
    return onError(res, 405)
  }

}

function onError(method, code) {
  return method.status(code).json(errors[code])
}

export default handler