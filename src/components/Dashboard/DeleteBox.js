import { useContext, useEffect, useState } from "react";
import { dashboardContext } from "../../contexts/DashboardContext";
import { userContext } from "../../contexts/UserContext";
import styles from "../../styles/components/DeleteBox.module.css";

export function DeleteBox({ id, reset }) {
  const { token } = useContext(userContext);
  const { updateLinks, links } = useContext(dashboardContext);

  const [processing, isProcessing] = useState(false);
  const [error, setError] = useState(null);

  async function handleConfirmDelete() {
    isProcessing(true);
    await deleteLink();
    isProcessing(false);
  }

  useEffect(() => {
    if (error)
      setTimeout(() => {
        setError(null);
      }, 4000);
  }, [error]);

  async function deleteLink() {
    const res = await fetch("https://simplifiga-api.herokuapp.com/" + id, {
      method: "DELETE",
      headers: {
        authorization: token,
      },
    });
    const result = await res.json();
    if (!result.deleted) return setError("Não foi possível deletar o link.");

    updateLinks(links.filter((l) => l.id !== id));
    reset(null);
  }

  return (
    <>
      {id && (
        <div className={styles.overlay}>
          <div className={styles.container}>
            <span>
              O link de código <span className={styles.code}>{id}</span> será
              deletado permanentemente.
            </span>
            <div>
              {!processing && (
                <>
                  <button
                    onClick={handleConfirmDelete}
                    className={styles.confirmButton}
                  >
                    Confirmar
                  </button>
                  <button
                    onClick={() => {
                      reset(null);
                    }}
                    className={styles.cancelButton}
                  >
                    Cancelar
                  </button>
                </>
              )}

              {processing && (
                <button className={styles.processingButton}>
                  Removendo link...
                </button>
              )}
            </div>
            <span className={styles.error}>{error}</span>
          </div>
        </div>
      )}
    </>
  );
}
