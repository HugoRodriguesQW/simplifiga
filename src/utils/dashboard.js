import { database } from "../pages/api/database";

export async function getAllLinksWithToken(token) {
  const links = await database.allWithParameter({name: 'origin', data: token, collection: 'links'})
  if(!links) return null
  return links.map((e)=> {
    const {_id, origin, ...filter} = e
    return filter
  })
}

export async function getAllReferencesWithToken(token) {
  const res = await database.find({collection: 'clients', key: 'token', data: token})
  return res ? res.references : null
}

export async function getUserData(token) {
  const res = await database.find({collection: 'clients', key: 'token', data: token})
  return res ? {
    references: res.references,
    locations: res.locations,
    deleted: res.deleted
  } : null
}