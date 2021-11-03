import gstyles from '../../styles/components/global.module.css'
import { Pie } from 'react-chartjs-2';
import {building} from '../../styles/components/global.module.css'
import {Color} from '../../utils/randomColor'
import { useContext } from 'react';
import { dashboardContext } from '../../contexts/DashboardContext';
import { Loading } from '../Effects/Loading';

export function BasicReference() {

  const loading = useContext(dashboardContext).loading
  const references = useContext(dashboardContext).references.slice(0, 5).sort((a,b)=> b.clicks - a.clicks)
  const data = references.map((reference)=> reference.clicks)

  const pieDatas = {
    labels: references.map(({ref}) => `${new URL(ref).host}${new URL(ref).pathname}`),
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

      {
        loading && <Loading/>
      }

      { !loading && (
      <>
      {references.length === 0 ?  (
        <Loading/>
      ): (
      <>
      <div>
        <div className={gstyles.basicInfoBox}>
          <span>
            Principais Referências
          </span>
          <strong>{data.length}</strong>
        </div>
        <div className={gstyles.basicGraphBox}>
          <Pie data={pieDatas} options={{plugins: {legend: false}}}/>
        </div>
      </div>
      <div className={gstyles.basicInfoDetails}>
        {references.map(({ref}, index)=> {
          const name = `${new URL(ref).host}${new URL(ref).pathname}`
          const currentData = data[index]
          const percent = ((currentData/data.reduce((p, c)=> { return p + c})) * 100).toFixed(2)
          return (
            <div key={ref+index} onClick>
              <span>{name}</span>
              <p>{currentData} cliques</p>
              <p>{percent}%</p>
            </div>
          )
        })}
      </div>
      </>
      )}
      </>
      )}
    </div>
  )
}