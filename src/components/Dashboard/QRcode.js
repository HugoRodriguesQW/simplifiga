import { Router } from "next/router";
import QRcode from "qrcode";
import { useContext, useEffect, useRef } from "react";
import { userContext } from "../../contexts/UserContext";
import styles from "../../styles/components/QRcode.module.css";

export function QRcodeWindow({ id, url, reset }) {
  const canvasRef = useRef();
  const { upgraded } = useContext(userContext);

  function handleUpgrade() {
    Router.push("/pricing");
  }

  function handleDownload() {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `${id}_simplifiga_qrcode.png`;
    link.href = url;
    link.click();

    reset(null);
  }

  useEffect(() => {
    if (canvasRef.current) loadQrCode();
  }, [canvasRef]);

  async function loadQrCode() {
    await QRcode.toCanvas(canvasRef.current, url, {
      width: "250",
      errorCorrectionLevel: "H",
    });
  }

  return (
    <>
      <div
        className={styles.overlay}
        onClick={() => {
          reset(null);
        }}
      />

      <div className={styles.container}>
        {upgraded === "COMPLETED" && (
          <>
            <span>{id}</span>
            <canvas ref={canvasRef}></canvas>
            <div className={styles.buttonBox}>
              <button
                onClick={handleDownload}
                className={styles.downloadButton}
              >
                <img src="/icons/bxs-download.svg" alt="Download" /> Download
              </button>
            </div>
          </>
        )}

        {["PENDING"].includes(upgraded) && (
          <>
            <img src="/icons/processing-time.svg" />
            <p>Sua atualização está sendo processada</p>
            <div className={styles.buttonBox}>
              <button onClick={handleUpgrade} className={styles.downloadButton}>
                Andamento
              </button>
            </div>
          </>
        )}

        {!["PENDING", "COMPLETED"].includes(upgraded) && (
          <>
            <img src="/icons/benefit.svg" />
            <p>Não está disponível no plano gratuito</p>
            <div className={styles.buttonBox}>
              <button onClick={handleUpgrade} className={styles.downloadButton}>
                Atualizar
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
