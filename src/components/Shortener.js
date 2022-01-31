import { useContext, useState } from "react";
import { ShortenerContext } from "../contexts/Shortener";
import styles from "../styles/components/Shortener.module.css";
import { BulkLinks } from "./BulkLinks";

export function Shortener({ updateLinks }) {
  const [showBulk, setShowBulk] = useState(false);

  const {
    handleShortLink,
    setLink,
    setLinkSurname,
    isProcessing,
    isSurnameValid,
    isLinkInputValid,
  } = useContext(ShortenerContext);

  return (
    <>
      <section className={styles.linkInputContainer}>
        <div className={styles.inputBox}>
          <input
            required
            type="url"
            placeholder="Cole seu link aqui"
            onChange={(e) => {
              setLink(e.target.value);
            }}
          ></input>
          <span className={styles.keyboardIcon} />
        </div>

        {isProcessing ? (
          <button className="active_button">Encurtando</button>
        ) : (
          <button
            onClick={() => {
              handleShortLink({ updateLinks });
            }}
          >
            Encurtar
          </button>
        )}

        {isLinkInputValid === false ? (
          <span className={styles.invalidInput}>
            Esse campo deve ser preenchido corretamente.
          </span>
        ) : null}
      </section>

      <section className={styles.surnameContainer}>
        <div className={styles.inputBox}>
          <input
            type="text"
            placeholder="Apelido (opcional)"
            onChange={(e) => {
              setLinkSurname(e.target.value);
            }}
          ></input>
          <span className={styles.keyboardIcon} />
        </div>
        <p className={styles.surnameMessage}>
          {isSurnameValid === false ? (
            <span className={styles.invalidSurnameMessage}>
              Esse apelido não está disponível.
            </span>
          ) : null}
          Use esse campo para definir um apelido para sua URL. Apenas caracteres
          de ‘0’ a ‘9’, ‘a’ a ‘z’ e ‘-’ são permitidos{" "}
          <span
            onClick={() => {
              setShowBulk(true);
            }}
            className={styles.linkStyle + " " + styles.floatRight}
          >
            Encurtar em massa
          </span>
        </p>
      </section>

      <div className={styles.mobileButtonContainer}>
        {isProcessing ? (
          <button className="active_button">Encurtando</button>
        ) : (
          <button
            onClick={() => {
              handleShortLink({ updateLinks });
            }}
          >
            Encurtar
          </button>
        )}
      </div>

      <BulkLinks reset={setShowBulk} show={showBulk} />
    </>
  );
}
