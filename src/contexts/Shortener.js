import { createContext, useEffect, useState } from "react";
import Fetch from "../pages/api/fetch";


export const ShortenerContext = createContext({})

export function ShortenerContextProvider ({children}) {

  const [link, setLink] = useState(null)
  const [linkSurname, setLinkSurname] = useState(null)
  const [shortednedLink, setShortenedLink] = useState(null)

  const [isShortened, setIsShortened] = useState(false)
  const [isSurnameValid, setIsSurnameValid] = useState(true) 
  const [isLinkInputValid, setIsLinkInputValid] = useState(true)

  const [error, setError] = useState(null)

  async function handleShortLink() {
    const inputLink = link
    const base = document.location.origin
    let surname =  linkSurname
    
    if(!validateLinkInput(inputLink)) return

    if(!surname) {
      surname = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 4)
    }

    if(await validateSurname(surname)) {
      const response = await Fetch({id: surname, link: inputLink, action: 'create'})
      if(!response?.error && response) {
        setShortenedLink(base+"/"+surname)
        setIsShortened(true)
        return
      }

      setError(100)
      return
    } 

    if(!linkSurname)  handleShortLink() 
  }

  function validateLinkInput(link) {
    
    try {
      const url = new URL(link)
      if(url.origin) {
        setIsLinkInputValid(true)
        return true
      }
    } catch {
    setIsLinkInputValid(false)
    return false
    }
  }

  async function validateSurname(surname) { 
    const hasOnDatabase = await Fetch({id: surname, action: 'has'})
    
    if(!hasOnDatabase) {
      setIsSurnameValid(true)
      return true
    }

    if (linkSurname) setIsSurnameValid(false)
    return false
  }

  function handleShortOtherLink() {
    setLink(null)
    setLinkSurname(null)
    setIsShortened(false)
    setIsSurnameValid(true)
    setIsLinkInputValid(true)
  }

  useEffect(()=> { 
    setIsShortened(shortednedLink != null)
  },[shortednedLink])

  useEffect(()=> {
    setTimeout(() => {setError(null)}, 4000)
  }, [error])

  return (
    <ShortenerContext.Provider value={{
      link,
      shortednedLink,
      setLink,
      setLinkSurname,
      isShortened,
      isSurnameValid,
      isLinkInputValid,
      handleShortLink,
      handleShortOtherLink,
      error
    }}>
      {children}
    </ShortenerContext.Provider>
  )
}