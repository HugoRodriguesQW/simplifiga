import { useContext } from "react";
import { SideBar } from "../../components/Dashboard/SideBar";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { userContext } from "../../contexts/UserContext";
import {dashboardContent, dashboardContainer} from '../../styles/pages/Dashboard.module.css'
import {graphContainer, detailsList, building} from '../../styles/components/global.module.css'
import {Bar} from 'react-chartjs-2'
import { Color } from "../../utils/randomColor";

export default function References () {
  const {logged} = useContext(userContext)

  const data = [1234, 2456, 542, 123, 23, 54, 12, 1, 2].sort((a, b) => b - a)
  
  const references = data.map((d, i) => { 
      if(i === data.length - 1) return 'outros'
      return `reference${i+1}.com`
  })

  const graphData = {
    labels: references,
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
            {references.map((l, index)=> {
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