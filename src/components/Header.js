/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import styles from "../styles/components/Header.module.css";
import { Logo } from "./Logo";
import Link from "next/link";
import { memo, useContext, useEffect, useState } from "react";
import { userContext } from "../contexts/UserContext";

const HeaderComponent = ({ routes, ...style }) => {
  const [isOpened, setIsOpened] = useState(true);
  const { clearUser, upgraded } = useContext(userContext);
  const [closeTimer, setCloseTimer] = useState(null);

  const [paths, setPaths] = useState({
    "/": "Encurtador",
    "/developer": "API",
    "/dashboard": "Dashboard",
    "/user/login": "Entrar",
    "/user/register": "Criar conta",
    "/pricing": "Preços",
    Sair: clearUser,
  });

  useEffect(() => {
    if (!upgraded) return;
    const newPaths = paths;
    newPaths["/pricing"] = "Premium";
    setPaths(newPaths);
  }, [upgraded]);

  function handleMenuEvent(state, delay) {
    if (state === true) return setIsOpened(state);
    if (!delay) setIsOpened(state);
    if (closeTimer) return;
    setCloseTimer(
      setTimeout(() => {
        setIsOpened(state);
        setCloseTimer(null);
      }, delay)
    );
  }

  useEffect(() => {
    window.innerWidth > 550
      ? handleMenuEvent(false, 1500)
      : handleMenuEvent(false, 500);

    window.addEventListener("scroll", () => {
      if (closeTimer) return;
      handleMenuEvent(false, 100);
    });
  }, []);

  return (
    <div
      className={`
      ${styles.headerContainer} 
      ${Object.keys(style).map((s) => {
        const isEnableBool = style[s] === true;
        return `${styles[isEnableBool ? s : style[s]]} `;
      })}`}
    >
      <div>
        <Logo type="half" width="15rem" />
      </div>

      <div
        onMouseEnter={() => {
          handleMenuEvent(true);
        }}
        onMouseLeave={() => {
          handleMenuEvent(false);
        }}
        onClick={() => {
          handleMenuEvent(true);
        }}
        className={`${styles.menu} ${isOpened ? styles.opened : styles.closed}`}
      >
        {isOpened ? (
          <div className={styles.linksBox}>
            {Object.keys(paths).map((p, i) => {
              if (routes && !routes.includes?.(p)) return null;
              if (typeof paths[p] === "function") {
                return (
                  <a key={p + i} onClick={paths[p]}>
                    {p}
                  </a>
                );
              }
              return (
                <Link key={p + i} href={p}>
                  {paths[p]}
                </Link>
              );
            })}
          </div>
        ) : null}

        <img src="/icons/bxs-user.svg" alt="Menu" title="Menu" />
      </div>
    </div>
  );
};

export const Header = memo(HeaderComponent);
