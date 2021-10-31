import Router from 'next/router'
import { useContext, useEffect } from 'react'
import { Header } from '../components/Header'
import styles from '../styles/pages/Dashboard.module.css'
import {Footer} from '../components/Footer'
import { BasicAnalytics } from '../components/BasicAnalytics'
import { BasicUserInfo } from '../components/BasicUserInfo'
import { userContext } from '../contexts/UserContext'

export default function Dashboard() {

  const {logged} = useContext(userContext)
  
  useEffect(()=> {
    if(!logged) Router.push('/user/login')
  }, [])

  return (
    <>
    <div className={styles.dashboardContainer}>
      { logged ? (
      <>
      <Header fixed padding routes={['/dashboard', '/developer', '/','Sair']}/>
      <aside className={`${styles.sideBar}`}>
        <span>Dashboard</span>
      </aside>

      <div className={styles.dashboardContent}>
        <BasicAnalytics className={styles.building}/>
        <BasicUserInfo/>
        <Footer/>
      </div>
      </>
      ): null}
    </div>
     </>
  )
}
