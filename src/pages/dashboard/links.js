import { useContext, useEffect } from "react";
import { SideBar } from "../../components/Dashboard/SideBar";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { userContext } from "../../contexts/UserContext";
import {dashboardContent, dashboardContainer, noBackground, contentTitle} from '../../styles/pages/Dashboard.module.css'
import { dashboardContext } from '../../contexts/DashboardContext'
import { detailsList, droplist, droplistMain, droplistContent, active, nostyle, full, exportCsv} from '../../styles/components/global.module.css'
import { Loading } from '../../components/Effects/Loading'
import { Empty } from '../../components/Effects/Empty'
import {DashboardHead} from '../../components/Head/DashboardHead'
import {MainComponent} from '../../components/MainComponent'
import {CSVLink} from 'react-csv'
import  Router  from "next/router";

const Links =  ()  => {
  const logged = useContext(userContext).logged
  const loading = useContext(dashboardContext).loading

  const links = useContext(dashboardContext).links.sort((a,b) => b.clicks - a.clicks)
  const data = links.map(({clicks}) => clicks)

  function handleDropListClick() {
    const droplist = document.getElementById(`droplist-1`) 
    if(droplist.classList.contains(active)) {
      return droplist.classList.remove(active)
    }

    droplist.className += ' ' + active
  }

  const headers = [
    { label: 'ID', key: 'id' },
    { label: 'Cliques', key: 'clicks' },
    { label: 'Destino', key: 'link' },
  ]

  useEffect(()=> {
    if(logged === false) Router.push('/user/login')
  }, [logged])

  return (
    <div className={dashboardContainer}>
      <DashboardHead subpage="Referências"/>
      { logged ? (
      <>
      <Header fixed padding routes={['/dashboard', '/developer', '/','Sair']}/>
      <SideBar current="/dashboard/links" />

      <div className={dashboardContent}>
          <div className={`${contentTitle} ${noBackground}`}>
            <span>Links encuntados</span>
            { loading && <a href="#">Carregando</a>}
            { !loading && (
            <CSVLink  
            className={exportCsv} headers={headers} data={links} 
            target="_blank" filename={`links_simplifiga`} separator={";"}>
            Exportar
            </CSVLink>
            )}
          </div>

          { loading && <div><Loading height="20rem" /></div>}
          { !loading && (
            <div>
            <div id={`droplist-1`}  className={`${droplist} ${nostyle} ${full}`}>
            <div className={droplistMain} onClick={handleDropListClick}>
              <span>Encurtar um link</span>
              <div>
                <img src="/icons/right-arrow.svg" alt="drop" onClick={handleDropListClick}/>
              </div>
            </div>

            <div className={`${droplistContent} ${nostyle}`}>
              <MainComponent/>
            </div>
          </div>
          </div>
          )}

          { loading && <div><Loading height="20rem" /></div>}
          { !loading && (
          <>
          {links.length === 0 ? (
            <Empty height="20rem"/>
          ): (
          <div className={detailsList}>
            {links.map(({id, link}, index)=> {
            const currentData = data[index]
            const percent = ((currentData/data.reduce((p, c)=> { return p + c})) * 100).toFixed(2)
            return (
              <div key={id+index}>
                {
                <a href={link} target="_blank" rel="noreferrer" >
                  simplifi.ga/{id}
                  <p>
                    {link.split('').slice(0, 30)}
                    {link.split('').slice(0, 30).length === link.split('').length ? '' : '...'}
                  </p>
                </a>
                }
                <div>
                <p>{currentData} cliques</p>
                <p>{percent}%</p>
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

export default Links