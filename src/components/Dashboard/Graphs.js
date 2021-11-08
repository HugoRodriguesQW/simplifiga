import { useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Color } from "../../utils/randomColor";

export function Graphs ({countries, datas}) {

  const options = {
    plugins: {legend: false}
  }

  const labels = countries.map(({country})=> {
    return country
  })

  const graphCountryData = {
    index: 0,
    level: 0,
    labels: countries.map(({country}) => country),
    datasets: [
      {
        label: 'Cliques',
        data: datas.map((region) => region.reduce((p,c)=> p + c)),
        backgroundColor: datas.map(() => Color()),
        hoverOffset: 12,
      },
    ]
  }

  const levelSelect = useRef(null)
  const [graphLevel, setGraphLevel] = useState(graphCountryData)

  function handleCountrySelector({target}) {
    const level = parseInt(target.value)
    levelSelect.current.selectedIndex = level
    levelSelect.current.value = level
    if(level === -1) return setGraphLevel(graphCountryData)
    setGraphLevel(detailsGraphLevel(level))
  }

  function handleLevelSelect(elem) {
    const level = elem[0]?.index
    if(level == null) return
    levelSelect.current.selectedIndex = level
    levelSelect.current.value = level
    setGraphLevel(detailsGraphLevel(level))
  }

  function detailsGraphLevel(index) {
    return {
      index,
      level: 1,
      labels: countries[index].regions.map(({name}) => name),
      datasets: [
      {
        label: 'Cliques',
        data: datas[index],
        backgroundColor: datas[index].map(() => Color())

      },
    ]
    }
  }

  return (
  <>
  <div>
    {graphLevel.level === 0 && 'Cliques por país'}
    {graphLevel.level === 1 && labels[graphLevel.index]}
    {labels[graphLevel.index] !== '???' && graphLevel.level === 1 && ': Cliques por estado'}
  <select ref={levelSelect} onChange={handleCountrySelector}>
    <option value={-1}>Padrão</option>
    {
      countries.map(({country}, i) => {
        return <option key={country+i} value={i}>{country}</option>
      })
    }
  </select>
  </div>
  <Bar data={graphLevel} options={options} 
  getElementAtEvent={graphLevel.level === 0 ? handleLevelSelect : null}
  />
  </>)
}