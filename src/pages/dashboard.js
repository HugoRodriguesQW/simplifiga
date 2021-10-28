import Router from 'next/router'
import { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import styles from '../styles/pages/Dashboard.module.css'

export default function Dashboard({logged}) {

  const [user, setUser] = useState({})

  useEffect(()=> {
    const user = localStorage.getItem('user')
    if(!user) return Router.push('/user/login')
    const userData = JSON.parse(user)
    if(!userData.lifetime || userData.lifetime < new Date()) {
      localStorage.removeItem('user')
      return Router.push('/user/login')
    }
    setUser(userData)
  }, [])

  return (
    <div className={styles.dashboardContainer}>
     { logged ? (
      <Header fixed padding routes={['/dashboard', '/developer', '/','Sair']}/>
    ) : (
      <Header fixed padding routes={[ '/user/register', '/user/login', '/']}/>
    )
    }
      <div>
      {user?.name}<br/>
      {user?.email}<br/>
      {user?.token}<br/>
      {user?.company}
      </div>

      <div>
        Página em construção...
      </div>

      <button onClick={()=> {
        localStorage.removeItem('user')
        Router.push('/user/login')
      }}>Sair</button>
    </div>
  )
}
