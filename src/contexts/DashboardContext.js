/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { userContext } from "../contexts/UserContext";

import {
  countLinkClicks,
  filterLocations,
  filterReferences,
  getAllDataFromAPI,
} from "../utils/dashboard";

export const dashboardContext = createContext({});

export function DashboardContextProvider({ children }) {
  const { token } = useContext(userContext);

  const [loading, setLoading] = useState(true);

  const [linkCount, setlinkCount] = useState(0);
  const [clickCount, setclickCount] = useState(0);
  const [referenceCount, setreferenceCount] = useState(0);
  const [locationsCount, setlocationsCount] = useState(0);

  const [links, setLinks] = useState([]);
  const [references, setReferences] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    setReferences(filterReferences(links));
    setLocations(filterLocations(links));

    setlinkCount(links.length);
    setclickCount(countLinkClicks(links));
    setreferenceCount(references.length);
    setlocationsCount(locations.length);
  }, [links]);

  useEffect(() => {
    importFromDatabase(token);
  }, [token]);

  async function importFromDatabase(token) {
    if (!token) return;
    setLoading(true);

    await getAllDataFromAPI(
      [token, "https://simplifiga-api.herokuapp.com/"],
      setLinks
    );

    setLoading(false);
  }

  function updateLinks(newLinks) {
    setLinks(newLinks);
  }

  return (
    <dashboardContext.Provider
      value={{
        loading,
        linkCount,
        clickCount,
        referenceCount,
        locationsCount,
        links,
        references,
        locations,
      }}
    >
      {children}
    </dashboardContext.Provider>
  );
}
