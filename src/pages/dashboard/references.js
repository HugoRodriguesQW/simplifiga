import { useContext, useEffect } from "react";
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
import {
  graphContainer,
  detailsList,
  without,
  exportCsv,
} from "../../styles/components/global.module.css";
import { Bar } from "react-chartjs-2";
import { Color } from "../../utils/randomColor";
import { dashboardContext } from "../../contexts/DashboardContext";
import { Loading } from "../../components/Effects/Loading";
import { Empty } from "../../components/Effects/Empty";
import { isValidUrl } from "../../utils/url";
import { DashboardHead } from "../../components/Head/DashboardHead";
import { CSVLink } from "react-csv";
import Router from "next/router";

export default function References() {
  const { logged } = useContext(userContext);
  const { loading } = useContext(dashboardContext);

  const references = useContext(dashboardContext).references.sort(
    (a, b) => b.clicks - a.clicks
  );
  const data = references.map(({ clicks }) => clicks);

  const graphData = {
    labels: references.map(({ ref }) => ref),
    datasets: [
      {
        label: "Número de cliques",
        data,
        backgroundColor: data.map(() => Color()),
      },
    ],
  };

  const options = {
    scales: {
      y: {
        stacked: true,
      },
    },
  };

  const headers = [
    { label: "Origem", key: "ref" },
    { label: "Cliques", key: "clicks" },
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
            routes={["/pricing", "/dashboard", "/developer", "/", "Sair"]}
          />
          <SideBar current="/dashboard/references" />

          <div className={dashboardContent}>
            <div className={`${contentTitle} ${noBackground}`}>
              <span>Referências encontradas</span>
              {loading && <a href="#">Carregando</a>}
              {!loading && (
                <CSVLink
                  className={exportCsv}
                  headers={headers}
                  data={references}
                  target="_blank"
                  filename={`ref_simplifiga`}
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
              <div className={graphContainer}>
                <Bar data={graphData} options={options} />
              </div>
            )}

            {loading && (
              <div>
                <Loading height="20rem" />
              </div>
            )}
            {!loading && (
              <>
                {references.length === 0 ? (
                  <Empty height="20rem" />
                ) : (
                  <div className={detailsList}>
                    {references.map(({ ref }, index) => {
                      const currentData = data[index];
                      const percent = (
                        (currentData /
                          data.reduce((p, c) => {
                            return p + c;
                          })) *
                        100
                      ).toFixed(2);
                      return (
                        <div key={ref + index}>
                          {isValidUrl(`http://${ref}`) ? (
                            <a
                              href={`http://${ref}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {ref}
                            </a>
                          ) : (
                            <span>{ref}</span>
                          )}
                          <div>
                            <p>{currentData} cliques</p>
                            <p>{percent}%</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
            <Footer />
          </div>
        </>
      ) : null}
    </div>
  );
}
