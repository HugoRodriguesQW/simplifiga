import { ShortenerTools } from '../../../utils/shortener'
import { DashboardTools } from '../../../utils/dashboard';
import { Database } from '../database';
import {blocked} from '../../../pages.json'
import errors from '../../../errors.json'
import NextCors from "nextjs-cors";

const handler = async (req, res) => {

  await NextCors(req, res, {
  methods: ["POST"],
    origin: "*",
    optionsSuccessStatus: 200,
  })

  const params = req.body ? await JSON.parse(req.body) : {}
  const token = req.headers['authorization']
  const url = params.url
  let   nick = params.nick

  if(!token) return onError(res, 400)

  const db = new Database()
  await db.connect()

  const {validateToken, insertOnDatabase, randomNickname, validateNick } = await ShortenerTools(db)

  if( await validateToken(token) === false) {
    return onError(res, 401)
  }

  switch(req.method){
  case 'GET':
    const {getAllLinksWithToken, getUserData} = await DashboardTools(db)
    const links = await getAllLinksWithToken(token)
    const datas = await getUserData(token)
    res.json({links, ...datas})
    break

  case 'POST': 
    if(!url) return onError(res, 400)

    if(nick) {
      const isValid = await validateNick(nick)
      if(!isValid || blocked.includes(nick)) {
        return onError(res, 422)
      }
    }

    if (!nick) {
      nick = await randomNickname()
      if(!nick){
        return onError(res, 500)
      }
    }
    
    await insertOnDatabase({nick, url}, token)

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