import { createContext, useEffect, useState } from "react";
import Router from 'next/router'

export const userContext = createContext({})

export function UserContextProvider ({children}) {

  const [name, setName] = useState("Elon Musk")
  const [email, setEmail] = useState("elomusk@elon.musk")
  const [token, setToken] = useState("00000000000000000000001")
  const [company, setCompany] = useState("SpaceX")
  const [logged, setLogged] = useState(null)

  useEffect(()=> {
    const user = localStorage.getItem('user')
    if(user){
      const lifetime = new Date(JSON.parse(user).lifetime)
      if(lifetime < new Date()) return clearUser()
      const userData = JSON.parse(user)
      setName(userData.name)
      setEmail(userData.email)
      setToken(userData.token)
      setCompany(userData.company)
      return setLogged(true)
    }
    setLogged(false)
  },[])

  function clearUser(){
    localStorage.removeItem('user')
    Router.reload()
  }

  return (
    <userContext.Provider value={{
      name,
      email,
      token,
      company,
      logged,
      clearUser
    }}>
      {children}
    </userContext.Provider>
  )
}