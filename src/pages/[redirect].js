import { redirect } from 'next/dist/server/api-utils'
import { database } from './api/database'
import requestIp from 'request-ip'
import ipapi from 'ipapi.co'

export default function RedirectPage (props) {

  return (
    <div>Destino não encontrado</div>
  )
}

export async function getServerSideProps({query, req, res}) {

  const redirectId = query?.redirect

  if(redirectId === "favicon.ico") return {props:{}}

  await database.connect()
  const redirectUrl = await database.getLink({id: redirectId})
  if(redirectUrl) {
    redirect(res, redirectUrl)

    generateAnalytics({
      req,
      redirectId
    })
  }


  return {
    props: {
      id: redirectId
    },
  }
}

async function generateAnalytics({redirectId, req}) {
  
  const localhostIp = ['127.0.0.1', '::1', '127.0.0.1', '::ffff:127.0.0.1']
  const ip = requestIp.getClientIp(req)

  let referer = 'direto'

  if(req.headers?.referer) {
    referer = req.headers.referer 
  }

  await database.connect()
  await database.addClick(redirectId)
  await database.updateReferrer(redirectId, referer)

  if(ip  && ip !== "" && !localhostIp.includes(ip)) {
    return ipapi.location((res)=> {
      const country = res.country
      const region = res.region
      
      if(country && region) return database.updateLocation(redirectId, {country, region}) 
      database.updateLocation(redirectId, {country: "???", region: "Incerto"})       
    }, ip)
  } 
    
  if(localhostIp.includes(ip)) database.updateLocation(redirectId, {country: "???", region: "Incerto"})

  console.info("Generated analytics...")
}