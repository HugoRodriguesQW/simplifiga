import { useContext, useEffect } from "react";
import { ShortenerContext } from "../contexts/Shortener";
import errors from "../errors.json";
import styles from "../styles/components/Error.module.css";
import { UpgradeNotify } from "./UpgradeNotify";

export function Error() {
  const { error } = useContext(ShortenerContext);

  const message = errors[error]?.message;
  const redirect = errors[error]?.redirect;

  return (
    <>
      {error && error === 101 && (
        <UpgradeNotify customValue={100} fixed animation />
      )}
      {error && (
        <div className={styles.errorContainer}>
          <span>{message}</span>
          {redirect && (
            <a
              href={redirect[0]}
              rel="noreferrer"
              target={redirect[2] ?? "_parent"}
            >
              {redirect[1]}
            </a>
          )}
        </div>
      )}
    </>
  );
}
