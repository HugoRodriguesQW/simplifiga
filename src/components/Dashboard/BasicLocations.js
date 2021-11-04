import gstyles from '../../styles/components/global.module.css'
import { Pie } from 'react-chartjs-2';
import {Color} from '../../utils/randomColor'
import { useContext } from 'react';
import { dashboardContext } from '../../contexts/DashboardContext';
import { Loading } from '../Effects/Loading';
import { Empty } from '../Effects/Empty';
 
export function BasicLocations() {

  const loading = useContext(dashboardContext).loading
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
    <>
    {
      loading && <div><Loading height="20rem"/></div>
    }
    { 
    !loading && (
    <div className={`${gstyles.basicFlexBox} ${gstyles.withGraphs}`}>
      {locations.length === 0 ? (
        <Empty height="20rem"/>
      ) : (
      <>
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
      </>
      )}
    </div>
    )}</>
  )
}