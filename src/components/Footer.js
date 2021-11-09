import styles from '../styles/components/Footer.module.css'
import Link from 'next/link'
import {EmailIcon, LinkedinIcon, TwitterIcon} from 'react-share'

export function Footer() {
  return (
    <footer className={styles.footerContainer}>
        <p>© {new Date().getFullYear()} Simplifi.ga - Ferramenta para encurtar e simplificar links longos.</p>

      <ul className={styles.siteMap}>
        {
          [
            {'name': 'Início', 'loc': ''},
            {'name': 'Privacidade & Termos', 'loc': 'privacy'}
          ].map((obj, i)=> {
            return (
             <span key={obj.name + i}> 
              <li>
                <Link href={`/${obj.loc}`}>{obj.name}</Link>
              </li>
            </span>
            )
          })
        }
      </ul>

      <div className={styles.social}>
        <a href="mailto:mailvitorhugosr@gmail.com" target="_blank" rel="noreferrer"><EmailIcon/></a>
        <a href="https://linkedin.com/in/hugorodriguesqw/" target="_blank" rel="noreferrer"><LinkedinIcon/></a>
        <a href="https://github.com/hugorodriguesqw/" target="_blank" rel="noreferrer"><img src="/icons/github.png" alt="github"/></a>
      </div>
      </footer>
  )
}