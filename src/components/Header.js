/* eslint-disable @next/next/no-img-element */
import styles from '../styles/components/Header.module.css'
import { Logo } from './Logo'
import Link from 'next/link'
import {  useEffect, useState } from 'react'
import Router from 'next/router'

export function Header({routes, ...style}) {

  const [isOpened, setIsOpened] = useState(false)

  const paths = {
    "/": "Encurtador",
    "/developer": "API",
    "/dashboard": "Dashboard",
    "/user/login": "Entrar",
    "/user/register": "Criar conta",
    "Sair": ()=> {
      localStorage.removeItem('user')
      Router.reload()
    }
  }

  function handleMenuEvent(state) {
    setIsOpened(state)
  }

  useEffect(
    () => {handleMenuEvent(false)}, []
  )

  return (
    <div className={`
      ${styles.headerContainer} 
      ${Object.keys(style).map((s) => {
      const isEnableBool = style[s] === true
      return `${styles[ isEnableBool ? s : style[s]]} `
    })}`}>
      <div>
        <Logo type="half" width="15rem"/>
      </div>
        
      <div
        onMouseLeave={() => {handleMenuEvent(false)} }
        onMouseEnter={() => {handleMenuEvent(true) }}
        className={`${styles.menu} ${isOpened ? styles.opened: styles.closed}`}>
        {isOpened ? (
        <div className={styles.linksBox}>
          { 
            Object.keys(paths).map((p, i)=> {
              if(routes && !routes.includes?.(p)) return null
              if(typeof(paths[p]) === 'function') {
                return(
                  <a key={p+i} onClick={paths[p]}>{p}</a>
                )
              } 
              return (
                  <Link  key={p+i} href={p}>{paths[p]}</Link>
              )
            })
          }
        </div>) : null }

        <img src="/icons/bxs-user.svg" alt="Menu" title="Menu"/>
      </div>
    </div>
  )
}