/* eslint-disable @next/next/no-img-element */
import styles from '../styles/components/Logo.module.css'
import Link from 'next/link'

export function Logo({type, ...custom}) {
  return (
    <strong className={styles[`${type}LogoImage`]}>
      <Link href="/">
       {
         type === "full" ? (
          <>
          <img src="/Logo512x512.svg" loading="lazy" alt="Simplifi.ga" title="Simplifiga"
          style={custom}/>
          <span>Simplifi.ga</span>
          </>
         ): (
          <img src="/Logo2547x512.svg" loading="lazy" alt="Simplifi.ga" title="Simplifiga" 
          style={custom}/>
         )
       }
       </Link>
    </strong>
  )
}