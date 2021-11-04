import gstyles from '../../styles/components/global.module.css'
import { Pie } from 'react-chartjs-2';
import {Color} from '../../utils/randomColor'
import { useContext } from 'react';
import { dashboardContext } from '../../contexts/DashboardContext';
import { Loading } from '../Effects/Loading';
import { Empty } from '../Effects/Empty';

export function BasicReference() {

  const loading = useContext(dashboardContext).loading
  const references = useContext(dashboardContext).references.slice(0, 5).sort((a,b)=> b.clicks - a.clicks)
  const data = references.map((reference)=> reference.clicks)

  const pieDatas = {
    labels: references.map(({ref}) => ref),
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

    { !loading && (
    <div className={`${gstyles.basicFlexBox} ${gstyles.withGraphs}`}>
      {references.length === 0 ?  (
        <Empty height="20rem"/>
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
          const currentData = data[index]
          const percent = ((currentData/data.reduce((p, c)=> { return p + c})) * 100).toFixed(2)
          return (
            <div key={ref+index}>
              <span>{ref}</span>
              <p>{currentData} cliques</p>
              <p>{percent}%</p>
            </div>
          )
        })}
      </div>
      </>
      )}
    </div>
    )}
    </>
  )
}