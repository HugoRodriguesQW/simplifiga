import { useContext, useEffect } from "react";
import { SideBar } from "../../components/Dashboard/SideBar";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { userContext } from "../../contexts/UserContext";
import {dashboardContent, dashboardContainer, noBackground, contentTitle} from '../../styles/pages/Dashboard.module.css'
import { dashboardContext } from '../../contexts/DashboardContext'
import {graphContainer, detailsList, droplist, droplistMain, droplistContent, active, without, exportCsv} from '../../styles/components/global.module.css'
import { Loading } from '../../components/Effects/Loading'
import { Empty } from '../../components/Effects/Empty'
import { Graphs } from "../../components/Dashboard/Graphs";
import {DashboardHead} from '../../components/Head/DashboardHead'
import {CSVLink} from 'react-csv'
import  Router  from "next/router";

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

  function handleDropListClick(index) {
    const droplist = document.getElementById(`droplist${index}`) 
    if(droplist.classList.contains(active)) {
      return droplist.classList.remove(active)
    }

    droplist.className += ' ' + active
  }

  const headers = [
    { label: 'País', key: 'country' },
    { label: 'Região', key: 'region' },
    { label: 'Cliques', key: 'clicks' },
  ]

  const csvCountries = countries.map(({country, regions})=> {
    return regions.map((region) => {
      return {...region, country}
    })
  })
  .flat()
  

  useEffect(()=> {
    if(logged === false) Router.push('/user/login')
  }, [logged])

  return (
    <div className={dashboardContainer}>
      <DashboardHead subpage="Localização" />
      { logged ? (
      <>
      <Header fixed padding routes={['/dashboard', '/developer', '/','Sair']}/>
      <SideBar current="/dashboard/locations" />

      <div className={dashboardContent}>
          <div className={`${contentTitle} ${noBackground}`}>
            <span>Origem de tráfego</span>
            { loading && <a href="#">Carregando</a>}
            { !loading && (
            <CSVLink  
            className={exportCsv} headers={headers} data={csvCountries} 
            target="_blank" filename={`local_simplifiga`} separator={";"}>
            Exportar
            </CSVLink>
            )}
          </div>
          { loading && <div><Loading height="20rem" /></div>}
          { !loading  &&  (
            <div className={graphContainer}>
              <Graphs countries={countries} datas={datas}/>
            </div>
          )}

          { loading && <div><Loading height="20rem" /></div>}
          { !loading && (
          <>
          {countries.length === 0 ? (
            <Empty height="20rem"/>
          ): (
          <div className={`${detailsList} ${without}`}>
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