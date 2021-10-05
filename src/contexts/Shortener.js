import { createContext, useEffect, useState } from "react";
import * as database from "../databaseExample.json" 


export const ShortenerContext = createContext({})

export function ShortenerContextProvider ({children}) {

  const [link, setLink] = useState(null)
  const [linkSurname, setLinkSurname] = useState(null)
  const [shortednedLink, setShortenedLink] = useState(null)

  const [isShortened, setIsShortened] = useState(false)
  const [isSurnameValid, setIsSurnameValid] = useState(true) // Para exibição visual de erro
  const [isLinkInputValid, setIsLinkInputValid] = useState(true) // Para exibição visual de erro

  function handleShortLink() { // Toda vez que o botão for pressionado
    const inputLink = link
    const base = document.location.origin
    let surname =  linkSurname
    
    if(!validateLinkInput(inputLink)) {
      console.info(">Shortener: invalid input URL")
      return
    }

    if(!surname) {
      surname = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 4)
    }

    if(validateSurname(surname)) {
      console.info("> Shortener:", surname," is a valid surname.", "link:", link)
      
      setShortenedLink(base+"/"+surname)
      setIsShortened(true)

      return
    } 

    console.info("> Shortener: invalid surname. Try out.")
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

  function validateSurname(surname) { // Completo: Verifica apelido e seta FALSO se digitado
    for(const key in database) {
      if (surname === key) {
        if (linkSurname) setIsSurnameValid(false)
        return false
      }
    }
    setIsSurnameValid(true)
    return true
  }

  function handleShortOtherLink() { // Completo: Limpa e reseta a página
    console.info("> Shortener: Clear Link, Surname and reset page" )
    setLink(null)
    setLinkSurname(null)
    setIsShortened(false)
  }

  useEffect(()=> { // Completo: Observa e seta o estado do encurtamento.
    setIsShortened(shortednedLink != null)
  },[shortednedLink])

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
      handleShortOtherLink
    }}>
      {children}
    </ShortenerContext.Provider>
  )
}