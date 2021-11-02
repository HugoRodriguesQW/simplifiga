import gstyles from '../../styles/components/global.module.css'
import { Pie } from 'react-chartjs-2';
import {building} from '../../styles/components/global.module.css'
import {Color} from '../../utils/randomColor'
 
export function BasicLocations() {

  const data = [2345, 1098, 123, 432, 552, 1236, 121, 433, 123, 1232, 1232, 12].slice(0, 5)
  const locations = data.map((d, i) => {
      if(i === data.length - 1) return 'outros'
      return `Local ${i+1}`
  })

  const pieDatas = {
    labels: locations,
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
          <strong>{data.length + 1}</strong>
        </div>
        <div className={gstyles.basicGraphBox}>
          <Pie data={pieDatas} options={{plugins: {legend: false}}}/>
        </div>
      </div>
      <div className={gstyles.basicInfoDetails}>
        {locations.map((l, index)=> {
          const currentData = data[index]
          const percent = ((currentData/data.reduce((p, c)=> { return p + c})) * 100).toFixed(2)
          return (
            <div key={l+index}>
              <span>{l}</span>
              <p>{currentData} cliques</p>
              <p>{percent}%</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}