/* eslint-disable @next/next/no-page-custom-font */

import { ShortenerContextProvider } from '../contexts/Shortener'
import '../styles/globals.css'
import { UserContextProvider } from '../contexts/UserContext'
import { DashboardContextProvider } from '../contexts/DashboardContext'

function MyApp({ Component, pageProps }) {
 
  return (
  <UserContextProvider>
  <DashboardContextProvider>
  <ShortenerContextProvider>
    <Component {...pageProps} />
  </ShortenerContextProvider>
  </DashboardContextProvider>
  </UserContextProvider>
  )
}

export default MyApp