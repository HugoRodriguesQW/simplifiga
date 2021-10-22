import { database } from "../pages/api/database"

export async function randomNickname() {
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

export async function validateNick(nick) {
  const hasOnDatabase = await database.has({id: nick})
  return !hasOnDatabase
}

export async function validateToken(token) {
  const isTokenValid = await database.validate({token})
  return isTokenValid
}

export async function insertOnDatabase({nick, url}) {
  const res = await database.create({id: nick, link: url})
  return res
}