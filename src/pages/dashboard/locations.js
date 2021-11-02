import { useContext } from "react";
import { Bar } from "react-chartjs-2";
import { SideBar } from "../../components/Dashboard/SideBar";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { userContext } from "../../contexts/UserContext";
import {dashboardContent, dashboardContainer} from '../../styles/pages/Dashboard.module.css'
import {graphContainer, detailsList, building} from '../../styles/components/global.module.css'
import { Color } from "../../utils/randomColor";

export default function Locations () {
  const {logged} = useContext(userContext)

  const data = [2345, 1098, 123, 432, 552, 1236, 121, 433, 123, 1232, 1232, 12].sort((a,b) => b - a)
  const locations = data.map((d, i) => { 
      if(i === data.length - 1) return 'outros'
      return `Local ${i+1}`
  })

  const graphData = {
    labels: locations,
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
      <SideBar current="/dashboard/locations" />

      <div className={dashboardContent}>
          <span>Locais de origem</span>
          <div className={`${graphContainer} ${building}`}>
            <Bar data={graphData} options={options} />
          </div>

          <div className={`${detailsList} ${building}`}>
            {locations.map((l, index)=> {
            const currentData = data[index]
            const percent = ((currentData/data.reduce((p, c)=> { return p + c})) * 100).toFixed(2)
            return (
              <div key={l+index}>
                <span>{l}</span>
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