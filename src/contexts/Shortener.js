import { createContext, useState } from "react";



export const ShortenerContext = createContext({})

export function ShortenerContextProvider ({children}) {
  const [isShortened, setIsShortened] = useState(false)

  function handleShortLink(event) {
    console.info(event)
    setIsShortened(true)
  }

  function handleShortOtherLink() {
    setIsShortened(false)
  }

  return (
    <ShortenerContext.Provider value={{
      isShortened,
      handleShortLink,
      handleShortOtherLink
    }}>
      {children}
    </ShortenerContext.Provider>
  )
}