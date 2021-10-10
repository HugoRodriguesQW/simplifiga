import { redirect } from 'next/dist/server/api-utils'
import { database } from './api/database'

export default function RedirectPage (props) {

  return (
    <div>Destino não encontrado</div>
  )
}

export async function getServerSideProps(context) {

  const redirectId = context.query?.redirect
  if(redirectId === "favicon.ico") return {props:{}}

  await database.connect()
  const redirectUrl = await database.getLink({id: redirectId})
  if(redirectUrl) redirect(context.res, redirectUrl)

  return {
    props: {
      id: redirectId
    },
  }
}