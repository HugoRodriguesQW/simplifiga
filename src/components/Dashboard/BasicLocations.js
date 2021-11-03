import gstyles from '../../styles/components/global.module.css'
import { Pie } from 'react-chartjs-2';
import {building} from '../../styles/components/global.module.css'
import {Color} from '../../utils/randomColor'
import { useContext } from 'react';
import { dashboardContext } from '../../contexts/DashboardContext';
 
export function BasicLocations() {

  const locations = useContext(dashboardContext).locations.slice(0, 5).sort((a,b)=> b.clicks - a.clicks)
  const data = locations.map((local)=> { return local.clicks})


  const pieDatas = {
    labels: locations.map((local)=> { return local.country}),
    datasets: [
      {
        data,
        backgroundColor: data.map(()=> { return Color()}),
        hoverOffset: 4,
      }
    ]
  }

  return (
    <div className={`${gstyles.basicFlexBox} ${gstyles.withGraphs} ${building}`}>
      <div>
        <div className={gstyles.basicInfoBox}>
          <span>
            Principais locais
          </span>
          <strong>{data.length}</strong>
        </div>
        <div className={gstyles.basicGraphBox}>
          <Pie data={pieDatas} options={{plugins: {legend: false}}}/>
        </div>
      </div>
      <div className={gstyles.basicInfoDetails}>
        {locations.map(({country}, index)=> {
          const currentData = data[index]
          const percent = ((currentData/data.reduce((p, c)=> { return p + c})) * 100).toFixed(2)
          return (
            <div key={country+index}>
              <span>{country}</span>
              <p>{currentData} cliques</p>
              <p>{percent}%</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}