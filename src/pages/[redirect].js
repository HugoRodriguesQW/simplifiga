import { redirect } from 'next/dist/server/api-utils'
import { Database } from './api/database'
import requestIp from 'request-ip'
import ipapi from 'ipapi.co'

export default function RedirectPage (props) {

  return (
    <div>Destino não encontrado :(</div>
  )
}


export async function getServerSideProps({query, req, res}) {

  const redirectId = query?.redirect

  if(redirectId === "favicon.ico") return {props:{}}

  const db =  new Database()
  await db.connect()
  
  const redirectUrl = await db.getLink({id: redirectId})
  if(redirectUrl) {
    await generateAnalytics({
      req,
      redirectId
    })
    redirect(res, redirectUrl)
  }

  return {
    props: {
      id: redirectId
    },
  }
}

async function generateAnalytics({redirectId, req}) {
  
  const db =  new Database()
  await db.connect()

  const localhostIp = ['127.0.0.1', '::1', '127.0.0.1', '::ffff:127.0.0.1']
  const ip = requestIp.getClientIp(req)

  let referer = 'direto'

  if(req.headers?.referer) {
    referer = req.headers.referer 
  }

  await db.addClick(redirectId)
  await db.updateReferrer(redirectId, referer)

  if(ip  && ip !== "" && !localhostIp.includes(ip)) {
    return ipapi.location((res)=> {
      const country = res.country
      const region = res.region
      
      if(country && region) return db.updateLocation(redirectId, {country, region}) 
      db.updateLocation(redirectId, {country: "???", region: "Incerto"})       
    }, ip)
  } 
    
  if(localhostIp.includes(ip)) db.updateLocation(redirectId, {country: "???", region: "Incerto"})

  console.info("Generated analytics... ok")
}