import { createContext, useEffect, useState } from "react"

export const dashboardContext = createContext({})

export function DashboardContextProvider ({children}) {

  const [linkCount, setlinkCount] = useState(0)
  const [clickCount, setclickCount] = useState(0)
  const [referenceCount, setreferenceCount] = useState(0)
  const [locationsCount, setlocationsCount] = useState(0)
  const [deletedCount, setdeletedCount] = useState(0)

  const [links, setLinks] = useState([
    {
      id:"creator",
      link:"https://github.com/HugoRodriguesQW/?1",
      clicks:"120"
    },
    {
      id:"creator2",
      link:"https://github.com/HugoRodriguesQW/?2",
      clicks:"20"
    },
    {
      id:"creator3",
      link:"https://github.com/HugoRodriguesQW/?3",
      clicks:"60"
    }
  ])

  const [references, setReferences] = useState([
    {
      ref: "https://example.of.reference/ww",
      clicks: 120
    },
    {
      ref: "https://example.of.reference/zz",
      clicks: 20
    },
    {
      ref: "https://example.of.reference/yy",
      clicks: 60
    }
  ])

  const [locations, setLocations] = useState([
    {
      country: "Brasil",
      clicks: 150
    },
    {
      country: "Portugal",
      clicks: 20
    },
    {
      country: "Autrália",
      clicks: 10
    }
  ])

  useEffect(()=> {
    setlinkCount(links.length)
    setclickCount(links.reduce((b, c)=> {
      return {clicks: parseInt(b.clicks) + parseInt(c.clicks)}
    }).clicks)
    setreferenceCount(references.length)
    setlocationsCount(locations.length)
    setdeletedCount(2)
  }, [links, locations, references])


  return (
    <dashboardContext.Provider value={{
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
