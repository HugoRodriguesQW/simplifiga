import gstyles from '../../styles/components/global.module.css'
import { Pie } from 'react-chartjs-2';
import {building} from '../../styles/components/global.module.css'
import {Color} from '../../utils/randomColor'

export function BasicReference() {

  const data = [1234, 2456, 542, 123, 123, 12, 1, 2, 3].slice(0, 5).sort((a,b) => b - a)
  
  const references = data.map((d, i) => { 
      if(i === data.length - 1) return 'outros'
      return `reference${i+1}.com`
  })

  const pieDatas = {
    labels: references,
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
            Principais Referências
          </span>
          <strong>{data.length + 1}</strong>
        </div>
        <div className={gstyles.basicGraphBox}>
          <Pie data={pieDatas} options={{plugins: {legend: false}}}/>
        </div>
      </div>
      <div className={gstyles.basicInfoDetails}>
        {references.map((l, index)=> {
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