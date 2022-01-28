import { createContext, useEffect, useState } from "react";
import Router from "next/router";

export const userContext = createContext({});

export function UserContextProvider({ children }) {
  const [name, setName] = useState("Elon Musk");
  const [email, setEmail] = useState("elomusk@elon.musk");
  const [token, setToken] = useState(null);
  const [company, setCompany] = useState("SpaceX");
  const [upgraded, setUpgraded] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [payee, setPayee] = useState(null);
  const [logged, setLogged] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const lifetime = new Date(JSON.parse(user).lifetime);
      if (lifetime < new Date()) return clearUser();
      const userData = JSON.parse(user);
      setName(userData.name);
      setEmail(userData.email);
      setToken(userData.token);
      setCompany(userData.company);
      setOrderId(userData.orderId);
      setPayee(userData.payee);

      if (!userData.orderId) return setLogged(true);
      checkUpgradeStatus(userData).then(
        (status) => {
          setUpgraded(status);
          setLogged(true);
        },
        (error) => {
          setUpgraded(false);
          setLogged(true);
          console.error("UserContext Error: " + error);
        }
      );
    }
    setLogged(false);
  }, []);

  function clearUser() {
    localStorage.removeItem("user");
    Router.reload();
  }

  function clearOrderDataInCache() {
    const user = localStorage.getItem("user");
    const userData = JSON.parse(user);
    delete userData.orderId;
    delete userData.payee;
    localStorage.setItem("user", JSON.stringify(userData));
  }

  function clearOrderData() {
    console.info("Cleaning orderData");
    return new Promise((resolve, reject) => {
      fetch(`${window.location.origin}/api/checkout`, {
        method: "POST",
        headers: {
          authorization: process.env.NEXT_PUBLIC_APP_TOKEN,
        },
        body: JSON.stringify({
          func: "clearOrderData",
          params: {
            orderId,
          },
        }),
      }).then(
        async (response) => {
          const data = await response.json();
          if (!data) return reject("cleaning-failed");
          if (data.error) return reject(data.error);
          clearOrderDataInCache();
          setOrderId(null);
          setUpgraded(null);
          setPayee(null);
          resolve("cleaned");
        },
        (error) => {
          console.info("UserContext:", error);
          reject(null);
        }
      );
    });
  }

  function checkUpgradeStatus({ orderId }) {
    console.info("I found a orderId. Checking...");
    return new Promise((resolve, reject) => {
      fetch(`${window.location.origin}/api/checkout`, {
        method: "POST",
        headers: {
          authorization: process.env.NEXT_PUBLIC_APP_TOKEN,
        },
        body: JSON.stringify({
          func: "checkStatus",
          params: {
            orderId,
          },
        }),
      }).then(
        async (response) => {
          const data = await response.json();
          if (!data) return reject("payment-invalid");
          if (data.error) return reject(data.error);
          resolve(data.status);
        },
        () => {
          reject(null);
        }
      );
    });
  }

  return (
    <userContext.Provider
      value={{
        name,
        email,
        token,
        company,
        logged,
        clearUser,
        upgraded,
        orderId,
        payee,
        clearOrderData,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
