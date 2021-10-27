import styles from '../styles/components/Header.module.css'
import { Logo } from './Logo'
import Link from 'next/link'

export function Header({routes, ...style}) {

  const paths = {
    "/": "Encurtador",
    "/dashboard": "Dashboard",
    "/user/login": "Entrar",
    "/user/register": "Criar conta",
  }

  return (
    <div className={`${styles.headerContainer} ${Object.keys(style).map((s) => {
      const isEnableBool = style[s] === true
      console.info(isEnableBool, style[s])
      return styles[ isEnableBool ? s : style[s]]
    })}`}>
      <div>
        <Logo type="half" width="15rem"/>
      </div>

        <div className={styles.linksBox}>
          { 
            Object.keys(paths).map((p, i)=> {
              if(routes && !routes.includes?.(p)) return null
              return (
                  <Link  key={p+i} href={p}>{paths[p]}</Link>
              )
            })
          }
        </div>
    </div>
  )
}