import { ShortenerContextProvider } from '../contexts/Shortener'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
  <ShortenerContextProvider>
    <Component {...pageProps} />
  </ShortenerContextProvider>
  )
}

export default MyApp
