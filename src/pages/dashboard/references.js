import { useContext } from "react";
import { SideBar } from "../../components/Dashboard/SideBar";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { userContext } from "../../contexts/UserContext";
import {dashboardContent, dashboardContainer} from '../../styles/pages/Dashboard.module.css'
import {graphContainer, detailsList} from '../../styles/components/global.module.css'
import {Bar} from 'react-chartjs-2'
import { Color } from "../../utils/randomColor";
import { dashboardContext } from "../../contexts/DashboardContext";
import { Loading } from "../../components/Effects/Loading";
import { Empty } from "../../components/Effects/Empty";
import { isValidUrl } from "../../utils/url";
import { DashboardHead } from "../../components/Head/DashboardHead";

export default function References () {
  const {logged} = useContext(userContext)
  const {loading} = useContext(dashboardContext)

  const references = useContext(dashboardContext).references.sort((a,b) => b.clicks - a.clicks)
  const data = references.map(({clicks}) => clicks)

  const graphData = {
    labels: references.map(({ref}) => ref),
    datasets: [
      {
        label: 'Número de cliques',
        data,
        backgroundColor: data.map(() => Color()),
      },
    ],
  };
  
  const options = {
    scales: {
      y: {
        stacked: true
      }
    }
  };

  return (
    <div className={dashboardContainer}>
      <DashboardHead subpage="Referências"/>
      { logged ? (
      <>
      <Header fixed padding routes={['/dashboard', '/developer', '/','Sair']}/>
      <SideBar current="/dashboard/references" />

      <div className={dashboardContent}>
          <span>Referências encontradas</span>
          { loading && <div><Loading height="20rem" /></div>}
          { !loading && (
            <div className={graphContainer}>
            <Bar data={graphData} options={options} />
            </div>
          )}

          { loading && <div><Loading height="20rem" /></div>}
          { !loading && (
          <>
          {references.length === 0 ? (
            <Empty height="20rem"/>
          ): (
          <div className={detailsList}>
            {references.map(({ref}, index)=> {
            const currentData = data[index]
            const percent = ((currentData/data.reduce((p, c)=> { return p + c})) * 100).toFixed(2)
            return (
              <div key={ref+index}>
                {
                isValidUrl(`http://${ref}`) ? (
                <a href={`http://${ref}`} target="_blank" rel="noreferrer" >{ref}</a>
                ) : (
                <span>{ref}</span>
                )}
                <div>
                <p>{currentData} cliques</p>
                <p>{percent}%</p>
                </div>
              </div>
            )
          })}
          </div>
          )}
          </>
          )}
          <Footer/>
      </div>
      </>
      ): null}
    </div>
  )
}