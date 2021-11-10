import { Database } from '../pages/api/database'

export async function ResetTools(db) {
  if(!db) {
    db = new Database()
    await db.connect()
  }

  async function resetPassword(password, email) {
    const res = await db.updateUserData({
      data: {'password': password},
      filter:  {'email': email}
    })
    return res
  }

  async function isCodeValid(code, email) {
    const res = await db.validateCode({
      code, 
      email
    })
    return res
  }

  async function isEmailValid(email) {
    const res = await db.find({collection: 'clients', key: 'email', data: email})
    return res != null
  }

  async function generateCode(email) {
    const code = await db.createCode({email})
    return code
  }

  return {
    isEmailValid,
    generateCode,
    isCodeValid,
    resetPassword
  }
}
