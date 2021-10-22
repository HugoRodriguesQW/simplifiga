import { createContext, useEffect, useState } from "react";

export const ShortenerContext = createContext({})

export function ShortenerContextProvider ({children}) {

  const [link, setLink] = useState(null)
  const [linkSurname, setLinkSurname] = useState(null)
  const [shortednedLink, setShortenedLink] = useState(null)

  const [isShortened, setIsShortened] = useState(false)
  const [isSurnameValid, setIsSurnameValid] = useState(true) 
  const [isLinkInputValid, setIsLinkInputValid] = useState(true)
  const [isProcessing, setProcessState] = useState(false)

  const [error, setError] = useState(null)

  async function handleShortLink() {
    setProcessState(true)

    const inputLink = link
    const base = document.location.origin.replace('wwww.', '')
    
    if(!validateLinkInput(inputLink)){
      return setProcessState(false)
    }

    try {
      const res = await fetch(`${base}/api/${process.env.NEXT_PUBLIC_API_TOKEN}/`, {
        method: "POST",
        body: JSON.stringify({
          url: link,
          nick: linkSurname
        })
      })

      const result = await res.json()
      
      if(!result.shortened) {
        console.info(result)
        throw result.code
      }

      setShortenedLink(result.shortened)
      setIsShortened(true)
    } catch (err) {
      switch(err) {
        case 3000:
          setIsSurnameValid(false)
          break
        default:
          setError(100)
      }
    }
    setProcessState(false)
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
    setProcessState(false)
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
      error,
      isProcessing
    }}>
      {children}
    </ShortenerContext.Provider>
  )
}