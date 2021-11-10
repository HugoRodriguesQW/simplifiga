import { createContext, useEffect, useState } from "react"
import { useContext } from 'react'
import { userContext } from '../contexts/UserContext'

export const dashboardContext = createContext({})

export function DashboardContextProvider ({children}) {

  const {token}  = useContext(userContext)

  const [linkCount, setlinkCount] = useState(0)
  const [clickCount, setclickCount] = useState(0)
  const [referenceCount, setreferenceCount] = useState(0)
  const [locationsCount, setlocationsCount] = useState(0)
  const [deletedCount, setdeletedCount] = useState(0)

  const [links, setLinks] = useState([])
  const [references, setReferences] = useState([])
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(()=> {
    const clickCounter = links && links.length === 0 ? 0 : ( 
    links.reduce((b, c)=> {
      return {clicks: parseInt(b.clicks) + parseInt(c.clicks)}
    })?.clicks )

    setlinkCount(links.length)
    setclickCount(clickCounter)
  }, [links])

  useEffect(()=> {
    setreferenceCount(references.length)
  },[references])

  useEffect(()=> {
    setlocationsCount(locations.length)
  }, [locations])

  useEffect(()=> {
    importFromDatabase(token)
  }, [token])

  async function importFromDatabase(token) {
    if(token) return
    setLoading(true)
    const res = await fetch(`${window.location.origin}/api/v2`, {
      method: "GET",
      headers: {
        authorization: token
      }
    })

    const data = await res.json()
    if(data.links && data.references && data.locations && data.deleted != null) {
      setLinks(data.links)
      setReferences(data.references)
      setLocations(data.locations)
      setdeletedCount(data.deleted)
    }

    setLoading(false)
  }

  return (
    <dashboardContext.Provider value={{
      loading,
      linkCount,
      clickCount,
      referenceCount,
      locationsCount,
      deletedCount,
      links,
      references,
      locations
    }}>
      {children}
    </dashboardContext.Provider>
  )
}
