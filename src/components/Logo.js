/* eslint-disable @next/next/no-img-element */
import styles from '../styles/components/Logo.module.css'

export function Logo({type}) {
  return (
    <h1 className={styles[`${type}LogoImage`]}>
       {
         type === "full" ? (
          <>
          <img src="/Logo512x512.svg" loading="lazy" alt="Simplifi.ga" title="Simplifiga"/>
          <span>Simplifi.ga</span>
          </>
         ): (
          <img src="/Logo2547x512.svg" loading="lazy" alt="Simplifi.ga" title="Simplifiga"/>
         )
       }
    </h1>
  )
}