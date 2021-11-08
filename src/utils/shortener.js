import { Database } from "../pages/api/database"

export async function ShortenerTools(db) {

  if(!db) {
    db = new Database()
    await db.connect()
  }

  async function randomNickname() {
    let validNick = null
      const tries = new Array(5).fill(0)

      await Promise.all(tries.map(async () => {
        const nick = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 4)
        const isValid = await validateNick(nick)
        if(isValid) {
          validNick = nick
          return false
        }
        return true
      }))

      if(validNick) return validNick
  }

  async function validateNick(nick) {
    const hasOnDatabase = await db.has({id: nick})
    return !hasOnDatabase
  }

  async function validateToken(token) {
    const isTokenValid = await db.validate({token})
    return isTokenValid
  }

  async function insertOnDatabase({nick, url}, token) {
    const res = await db.create({id: nick, link: url, origin: token, clicks: 0})
    return res
  }

  return {
    randomNickname,
    validateNick,
    validateToken,
    insertOnDatabase
  }
}