import styles from "../styles/components/BulkLinks.module.css";
import { Form } from "@unform/web";
import Input from "./Form/Input";
import { useContext, useRef, useState } from "react";
import { userContext } from "../contexts/UserContext";
import { CSVLink } from "react-csv";
import extenso from "extenso";
import Router from "next/router";
import { ShortenerContext } from "../contexts/Shortener";

export function BulkLinks({ reset, show }) {
  const formRef = useRef(null);
  const [reference, useReference] = useState(null);
  const [errorRows, setErrorRows] = useState(null);
  const [dataToDown, setDataToDown] = useState(null);
  const [errorsCounter, setErrorsCounter] = useState(0);
  const [filename, setFilename] = useState(null);
  const [importing, setImporting] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [viewer, setViewer] = useState(false);

  const { token, upgraded, logged } = useContext(userContext);
  const { setError } = useContext(ShortenerContext);
  function handleFileChange() {
    const filename = reference.current.files[0]?.name ?? null;
    setFilename(filename);
  }

  function handleViewCSV() {
    setViewer(true);
  }

  async function handleFileSubmit(_, { reset }) {
    setImporting(true);
    const file = reference.current.files[0];
    if (!file) return;
    getCsvParameters(file).then(
      (links) => {
        preValidateLinks(links).then(
          (validLinks) => {
            execFetch(validLinks);
          },
          (invalidRows) => {
            setErrorRows(invalidRows);
          }
        );
        setImporting(false);
        reset();
      },
      (error) => {
        setFileError(error);
      }
    );
  }

  async function execFetch(linksArray) {
    setProcessing(true);
    fetch(`https://simplifiga-api.herokuapp.com/`, {
      method: "POST",
      headers: {
        authorization: token,
      },
      body: JSON.stringify(linksArray),
    }).then(
      async (response) => {
        setProcessing(false);
        if (response.status !== 200) {
          handleBack();
          return setError(102);
        }

        const result = await response.json();
        setErrorsCounter(result.filter((r) => r.statusCode).length);
        setDataToDown(
          result.map((item) => Object.keys(item).map((e) => item[e]))
        );
      },
      () => {
        setProcessing(false);
        handleBack();
        setError(102);
      }
    );
  }

  function preValidateLinks(links) {
    return new Promise((resolve, reject) => {
      const checked = links.map((link, index) => {
        if (!link.url) return { rowError: index + 1 };
        return link;
      });

      const invalidFields = checked
        .filter((l) => l.rowError)
        .map(({ rowError }) => rowError);

      if (invalidFields.length) return reject(invalidFields);
      resolve(checked);
    });
  }

  function getCsvParameters(file) {
    return new Promise((resolve, reject) => {
      const fReader = new FileReader();
      fReader.readAsDataURL(file);
      fReader.onloadend = async function (event) {
        const [[type, encode], text] = event.target.result
          .split(",")
          .map((e, i) => {
            if (i === 0) return e.replace("data:", "").split(";");
            return e;
          });

        if (type !== "text/csv") return reject("Tipo de arquivo inválido.");
        if (encode !== "base64") return reject("Erro com a codificação");

        const decoded = Buffer.from(text, encode).toString("utf8");
        resolve(
          decoded
            .split(/\r\n|\n/)
            .map((line) => {
              return line
                .split(/[,;]/)
                .map((col) => {
                  return col.length === 0 ? null : col;
                })
                .splice(0, 2);
            })
            .filter((cell) => cell.length === 2)
            .map((cell) => {
              return {
                url: cell[0],
                id: cell[1],
              };
            })
        );
      };
    });
  }

  function setFileError(message) {
    formRef.current.setErrors({
      file: message,
    });
  }

  function handleBack() {
    setErrorRows(null);
    setErrorsCounter(0);
    setDataToDown(null);
    setFilename(null);
    setImporting(false);
    setViewer(false);
  }

  function handleOverlay() {
    if (processing) return;
    if (viewer) return setViewer(false);
    reset(false);
  }

  if (!show) return null;

  switch (upgraded) {
    case "COMPLETED":
      break;
    case "PENDING":
      return (
        <>
          <div onClick={handleOverlay} className={styles.overlay}></div>
          <div className={styles.container}>
            <strong>Sua atualização está sendo processada</strong>
            <p>Ainda não é possível usar esta função.</p>
            <img className={styles.himage} src="/icons/processing-time.svg" />
            <div className={styles.buttonsBox}>
              <button
                onClick={() => {
                  Router.push("/checkout");
                }}
              >
                Andamento
              </button>
            </div>
          </div>
        </>
      );
    default:
      return (
        <>
          <div onClick={handleOverlay} className={styles.overlay}></div>
          <div className={styles.container}>
            <strong>Simplifiga Premium</strong>
            <p>Esta função é exclusiva do plano Premium</p>
            <img className={styles.himage} src="/icons/benefit.svg" />
            <div className={styles.buttonsBox}>
              {!logged && (
                <button
                  onClick={() => {
                    Router.push("/user/login/?next=index");
                  }}
                >
                  Entrar
                </button>
              )}
              <button
                onClick={() => {
                  Router.push("/pricing");
                }}
              >
                Atualize
              </button>
            </div>
          </div>
        </>
      );
  }

  return (
    <>
      <div onClick={handleOverlay} className={styles.overlay}></div>
      <div className={styles.container}>
        {errorRows && (
          <div className={styles.errorRowsBox}>
            <strong>Não é possível encurtar</strong>
            <p>As seguintes linhas contém erros</p>
            <div className={styles.numbersList}>
              {errorRows.map((row, id) => {
                return <p key={row + id}>{row}</p>;
              })}
            </div>
            <div className={styles.buttonsBox}>
              <button onClick={handleBack}>Voltar</button>
            </div>
          </div>
        )}

        {!errorRows && !dataToDown && !processing && (
          <div className={styles.formBox}>
            <strong>Encurtar links em massa</strong>
            <div className={styles.content}>
              <p>Importe um arquivo .CSV e encurte vários links de uma vez</p>
            </div>
            <Form onSubmit={handleFileSubmit} ref={formRef}>
              <Input
                onChange={handleFileChange}
                className={styles.InputElement}
                getRef={useReference}
                name="file"
                accept=".csv"
              >
                <div className={styles.inputContent}>
                  {!filename && (
                    <>
                      {!importing && <p>Arraste um arquivo para importar </p>}
                      {importing && <p>Importando arquivo... </p>}
                      <img src="/icons/upload.svg" />
                    </>
                  )}

                  {filename && (
                    <>
                      <strong>{filename}</strong>
                      <img src="/icons/upload.svg" />
                    </>
                  )}
                </div>
              </Input>

              <button type="submit">Enviar</button>
            </Form>
          </div>
        )}

        {dataToDown && (
          <div className={styles.downloadBox}>
            <strong>Operação concluída</strong>
            <div className={styles.content}>
              <p>A lista de links foi processada com sucesso.</p>
              <p>
                Links com erros:{" "}
                <strong className={styles.red}>
                  {errorsCounter} ({extenso(errorsCounter ?? 0)})
                </strong>
              </p>
            </div>
            <div className={styles.buttonsBox}>
              <CSVLink
                className={styles.exportCsv}
                data={dataToDown}
                target="_blank"
                filename={`bulk_links_simplifiga`}
                separator={";"}
              >
                Download
              </CSVLink>
              <button onClick={handleViewCSV}>Ver</button>
              <button onClick={handleBack}>Voltar</button>
            </div>
          </div>
        )}

        {processing && (
          <div className={styles.processingBox}>
            <strong>Quase pronto</strong>
            <p>Estamos encurtando sua lista de links</p>
          </div>
        )}
      </div>

      {viewer && (
        <div className={styles.viewerContainer}>
          <div
            onClick={() => {
              setViewer(false);
            }}
          ></div>
          <table>
            <tr>
              <th>ID</th>
              <th>Target</th>
              <th>Shortcut</th>
            </tr>
            {dataToDown.map((row, i) => {
              return (
                <tr key={"viewer-row-" + i}>
                  {row.map((col, j) => {
                    return <td key={"viewer-row-" + i + "-col-" + j}>{col}</td>;
                  })}
                </tr>
              );
            })}
          </table>
        </div>
      )}
    </>
  );
}
