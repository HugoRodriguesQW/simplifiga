import { useContext } from "react";
import { SideBar } from "../../components/Dashboard/SideBar";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { userContext } from "../../contexts/UserContext";
import {dashboardContent, dashboardContainer} from '../../styles/pages/Dashboard.module.css'
import {graphContainer, detailsList, building} from '../../styles/components/global.module.css'
import {Bar} from 'react-chartjs-2'
import { Color } from "../../utils/randomColor";
import { dashboardContext } from "../../contexts/DashboardContext";

export default function References () {
  const {logged} = useContext(userContext)

  const references = useContext(dashboardContext).references.sort((a,b) => b.clicks - a.clicks)
  const data = references.map(({clicks}) => clicks)

  const graphData = {
    labels: references.map(({ref}) => `${new URL(ref).host}${new URL(ref).pathname}`),
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
      { logged ? (
      <>
      <Header fixed padding routes={['/dashboard', '/developer', '/','Sair']}/>
      <SideBar current="/dashboard/references" />

      <div className={dashboardContent}>
          <span>Referências encontradas</span>
          <div className={`${graphContainer} ${building}`}>
            <Bar data={graphData} options={options} />
          </div>

          <div className={`${detailsList} ${building}`}>
            {references.map(({ref}, index)=> {
            const name = `${new URL(ref).host}${new URL(ref).pathname}`
            const currentData = data[index]
            const percent = ((currentData/data.reduce((p, c)=> { return p + c})) * 100).toFixed(2)
            return (
              <div key={ref+index}>
                <a href={ref} target="_blank" rel="noreferrer" >{name}</a>
                <div>
                <p>{currentData} cliques</p>
                <p>{percent}%</p>
                </div>
              </div>
            )
          })}
          </div>
          <Footer/>
      </div>
      </>
      ): null}
    </div>
  )
}