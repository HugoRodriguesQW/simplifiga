import { useContext, useEffect, useState } from "react";
import { SideBar } from "../../components/Dashboard/SideBar";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { userContext } from "../../contexts/UserContext";
import {
  dashboardContent,
  dashboardContainer,
  noBackground,
  contentTitle,
} from "../../styles/pages/Dashboard.module.css";
import { dashboardContext } from "../../contexts/DashboardContext";
import {
  detailsList,
  droplist,
  droplistMain,
  droplistContent,
  active,
  nostyle,
  full,
  exportCsv,
  droplistItemWithButtons,
  redButton,
  blackButton,
} from "../../styles/components/global.module.css";
import { Loading } from "../../components/Effects/Loading";
import { Empty } from "../../components/Effects/Empty";
import { DashboardHead } from "../../components/Head/DashboardHead";
import { MainComponent } from "../../components/MainComponent";
import { CSVLink } from "react-csv";
import Router from "next/router";
import { DeleteBox } from "../../components/Dashboard/DeleteBox";
import { QRcodeWindow } from "../../components/Dashboard/QRcode";

const Links = () => {
  const [deleteId, setDeleteId] = useState(null);
  const [QrCode, setQrCode] = useState(null);
  const updateLinks = useContext(dashboardContext).updateLinks;

  const logged = useContext(userContext).logged;
  const loading = useContext(dashboardContext).loading;

  const links = useContext(dashboardContext).links.sort(
    (a, b) => b.clicks - a.clicks
  );
  const data = links.map(({ clicks }) => clicks);

  function handleDropListClick() {
    const droplist = document.getElementById(`droplist-1`);
    if (droplist.classList.contains(active)) {
      return droplist.classList.remove(active);
    }

    droplist.className += " " + active;
  }

  const headers = [
    { label: "ID", key: "id" },
    { label: "Cliques", key: "clicks" },
    { label: "Destino", key: "link" },
  ];

  useEffect(() => {
    if (logged === false) Router.push("/user/login");
  }, [logged]);

  return (
    <div className={dashboardContainer}>
      <DashboardHead subpage="Referências" />
      {logged ? (
        <>
          <Header
            fixed
            padding
            routes={[
              "/pricing",
              "/support",
              "/dashboard",
              "/developer",
              "/",
              "Sair",
            ]}
          />
          <SideBar current="/dashboard/links" />

          <div className={dashboardContent}>
            <div className={`${contentTitle} ${noBackground}`}>
              <span>Links encuntados</span>
              {loading && <a href="#">Carregando</a>}
              {!loading && (
                <CSVLink
                  className={exportCsv}
                  headers={headers}
                  data={links}
                  target="_blank"
                  filename={`links_simplifiga`}
                  separator={";"}
                >
                  Exportar
                </CSVLink>
              )}
            </div>

            {loading && (
              <div>
                <Loading height="20rem" />
              </div>
            )}
            {!loading && (
              <div>
                <div
                  id={`droplist-1`}
                  className={`${droplist} ${nostyle} ${full}`}
                >
                  <div className={droplistMain} onClick={handleDropListClick}>
                    <span>Encurtar um link</span>
                    <div>
                      <img
                        src="/icons/right-arrow.svg"
                        alt="drop"
                        onClick={handleDropListClick}
                      />
                    </div>
                  </div>

                  <div className={`${droplistContent} ${nostyle}`}>
                    <MainComponent updateLinks={updateLinks} />
                  </div>
                </div>
              </div>
            )}

            {loading && (
              <div>
                <Loading height="20rem" />
              </div>
            )}
            {!loading && (
              <>
                {links.length === 0 ? (
                  <Empty height="20rem" />
                ) : (
                  <div className={detailsList}>
                    {links.map(({ id, target }, index) => {
                      const currentData = data[index];
                      const percent = (
                        (currentData /
                          data.reduce((p, c) => {
                            return p + c;
                          })) *
                        100
                      ).toFixed(2);
                      return (
                        <div key={id + index}>
                          {
                            <a href={target} target="_blank" rel="noreferrer">
                              simplifi.ga/{id}
                              <p>
                                {target.split("").slice(0, 30)}
                                {target.split("").slice(0, 30).length ===
                                target.split("").length
                                  ? ""
                                  : "..."}
                              </p>
                            </a>
                          }
                          <div className={droplistItemWithButtons}>
                            <div>
                              <p>{currentData} cliques</p>
                              <p>{percent}%</p>
                            </div>

                            <div>
                              <div
                                className={blackButton}
                                onClick={() => {
                                  setQrCode({
                                    url: "https://simplifi.ga/" + id,
                                    id,
                                  });
                                }}
                              >
                                <img src="/icons/bx-qr.svg" alt="QR" />
                              </div>

                              <div
                                className={redButton}
                                onClick={() => {
                                  setDeleteId(id);
                                }}
                              >
                                <img src="/icons/bxs-trash.svg" alt="Del" />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
            {deleteId && <DeleteBox id={deleteId} reset={setDeleteId} />}
            {QrCode && (
              <QRcodeWindow
                id={QrCode?.id}
                url={QrCode?.url}
                reset={setQrCode}
              />
            )}
            <Footer />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Links;
