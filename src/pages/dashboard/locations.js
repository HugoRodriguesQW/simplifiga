import { memo, useContext, useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import { SideBar } from "../../components/Dashboard/SideBar";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { userContext } from "../../contexts/UserContext";
import {dashboardContent, dashboardContainer} from '../../styles/pages/Dashboard.module.css'
import { dashboardContext } from '../../contexts/DashboardContext'
import {graphContainer, detailsList, building, droplist, droplistMain, droplistContent, active} from '../../styles/components/global.module.css'
import { Color } from "../../utils/randomColor";
import { Loading } from '../../components/Effects/Loading'
import { Empty } from '../../components/Effects/Empty'

const Locations =  ()  => {
  const logged = useContext(userContext).logged
  const loading = useContext(dashboardContext).loading

  const countries = useContext(dashboardContext).locations
  .sort((a,b) => {
    const CountA = a.regions.reduce((p, c)=> p.clicks + c.clicks)
    const CountB = b.regions.reduce((p, c)=> p.clicks + c.clicks)
    return CountA - CountB
  })

  const datas = countries.map((country) => {
    return country.regions.map((region) => region.clicks)
  })

  const graphCountryData = {
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
  };

  const options = {
    plugins: {legend: false}
  }

  const levelSelect = useRef(null)
  const [graphLevel, setGraphLevel] = useState(graphCountryData)
  
  function handleLevelSelect(elem) {
    setGraphLevel(detailsGraphLevel(elem[0].index))
  }

  function detailsGraphLevel(index) {
    return {
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

  function handleCountrySelector({target}) {
    const level = parseInt(target.value)
    if(level === -1) return setGraphLevel(graphCountryData)
    setGraphLevel(detailsGraphLevel(level))
  }

  function handleDropListClick(index) {
    const droplist = document.getElementById(`droplist${index}`) 
    if(droplist.classList.contains(active)) {
      return console.info(droplist.classList.remove(active))
    }

    droplist.className += ' ' + active
  }


  return (
    <div className={dashboardContainer}>
      { logged ? (
      <>
      <Header fixed padding routes={['/dashboard', '/developer', '/','Sair']}/>
      <SideBar current="/dashboard/locations" />

      <div className={dashboardContent}>
          <span>Locais de origem</span>
          { loading && <div><Loading height="20rem" /></div>}
          { !loading && (
            <div className={graphContainer}>

            <select ref={levelSelect} onChange={handleCountrySelector}>
              <option value={-1}>Padrão</option>
              {
                countries.map(({country}, i) => {
                  return <option key={country+i} value={i}>{country}</option>
                })
              }
            </select>

            <Bar data={graphLevel} options={options} 
              getElementAtEvent={graphLevel.level === 0 ? handleLevelSelect : null} 
            />
            </div>
          )}

          { loading && <div><Loading height="20rem" /></div>}
          { !loading && (
          <>
          {countries.length === 0 ? (
            <Empty height="20rem"/>
          ): (
          <div className={detailsList}>
            {countries.map(({country, regions}, index)=> {
            const total = datas[index].reduce((p, c) => p + c)
            const regionsTotal = datas.map((e) => e.reduce((p,c)=> p + c))
            const totalPercent = ((total/regionsTotal.reduce((p, c)=> { return p + c})) * 100).toFixed(2)

            return (
              <div id={`droplist${index}`} key={country+index} className={droplist}>
                <div className={droplistMain} onClick={() => {handleDropListClick(index)}}>
                  <span>{country}</span>
                  <div>
                  <p>{total} cliques</p>
                  <p>{totalPercent}%</p>
                  <img src="/icons/right-arrow.svg" alt="drop" onClick={() => {handleDropListClick(index)}}/>
                  </div>
                </div>

                <div className={droplistContent}>
                  {
                  regions.map(({name, clicks}, i) => {
                    const percent = (clicks / regionsTotal.reduce((p, c)=> { return p + c}) * 100).toFixed(2)
                    return (
                      <div key={name+i}>
                        <span>{name}</span>
                        <div>
                        <p>{clicks} cliques</p>
                        <p>{percent}%</p>
                        </div>
                      </div>
                    )
                  })
                  }
                </div>
              </div>
            )
          })}
          </div>
           )}
           </>
           )}
          <Footer/>
      </div>
      </>
      ): null}
    </div>
  )
}

export default Locations