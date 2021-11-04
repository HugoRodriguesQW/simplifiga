import { redirect } from 'next/dist/server/api-utils'
import { database } from './api/database'

export default function RedirectPage (props) {

  return (
    <div>Destino não encontrado <a href="http://localhost:3000/creator">Sq</a></div>
  )
}

export async function getServerSideProps(context) {

  const redirectId = context.query?.redirect
  let referer = 'direto'
  if(context.req.headers.referer) {
    referer = context.req.headers.referer  
  }
  
  if(redirectId === "favicon.ico") return {props:{}}
  
  await database.connect()
  const redirectUrl = await database.getLink({id: redirectId})
  if(redirectUrl) {
    redirect(context.res, redirectUrl)
    await database.addClick(redirectId)
    await database.updateReferrer(redirectId, referer)
  }


  return {
    props: {
      id: redirectId
    },
  }
}