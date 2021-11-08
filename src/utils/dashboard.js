import { Database } from "../pages/api/database";

export async function DashboardTools (db) {

  if(!db) {
    db = new Database()
    await db.connect()
  }

    async function getAllLinksWithToken(token) {
      const links = await db.allWithParameter({name: 'origin', data: token, collection: 'links'})
      if(!links) return null
      return links.map((e)=> {
        const {_id, origin, ...filter} = e
        return filter
      })
    }

    async function getAllReferencesWithToken(token) {
      const res = await db.find({collection: 'clients', key: 'token', data: token})
      return res ? res.references : null
    }

    async function getUserData(token) {
      const res = await db.find({collection: 'clients', key: 'token', data: token})
      return res ? {
        references: res.references,
        locations: res.locations,
        deleted: res.deleted
      } : null
    }

  return {
    getAllLinksWithToken,
    getAllReferencesWithToken,
    getUserData
  }
}