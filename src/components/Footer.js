import styles from '../styles/components/Footer.module.css'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className={styles.footerContainer}>
        <p>© {new Date().getFullYear()} Simplifi.ga - Ferramenta para encurtar e simplificar links longos.</p>

      <ul className={styles.siteMap}>
        {
          [
            {'name': 'Início', 'loc': ''},
            {'name': 'Privacidade & Termos', 'loc': 'privacy'}
          ].map((obj, i, arr)=> {
  
            return (
            <>
            <li key={`${i}${Math.random().toFixed(100)}`}>
              <Link href={`/${obj.loc}`}>{obj.name}</Link>
            </li>

            {i === arr.length-1 ? null : (
            <span key={`${i}${Math.random().toFixed(100)}`} className={styles.separator}>|</span>
            )}
            </>
            )
          })
        }
      </ul>

      </footer>
  )
}