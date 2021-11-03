import { insertOnDatabase, randomNickname, validateNick, validateToken } from '../../../utils/shortener'
import { getAllLinksWithToken, getUserData } from '../../../utils/dashboard';
import errors from '../../../errors.json'
import NextCors from "nextjs-cors";
import { database } from '../database';

const handler = async (req, res) => {

  await NextCors(req, res, {
  methods: ["POST"],
    origin: "*",
    optionsSuccessStatus: 200,
  })

  const params = req.body ? await JSON.parse(req.body) : {}
  const token = req.headers['authorization'] ?? params.token
  const url = params.url
  let   nick = params.nick

  if(!token) return onError(res, 400)

  await database.connect()

  if( await validateToken(token) === false) {
    return onError(res, 401)
  }

  switch(req.method){
  case 'GET':
    // Pegar os links, referências e localização do usuário. Todos os dados
    const links = await getAllLinksWithToken(token)
    const datas = await getUserData(token)
    res.json({links, ...datas})
    break
  case 'POST': 
    if(!url) return onError(res, 400)

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