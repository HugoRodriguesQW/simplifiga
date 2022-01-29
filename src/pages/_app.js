/* eslint-disable @next/next/no-page-custom-font */

import { ShortenerContextProvider } from "../contexts/Shortener";
import "../styles/globals.css";
import { UserContextProvider } from "../contexts/UserContext";
import { DashboardContextProvider } from "../contexts/DashboardContext";
import { Error } from "../components/Error";

function MyApp({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <DashboardContextProvider>
        <ShortenerContextProvider>
          <Component {...pageProps} />
          <Error />
        </ShortenerContextProvider>
      </DashboardContextProvider>
    </UserContextProvider>
  );
}

export default MyApp;
