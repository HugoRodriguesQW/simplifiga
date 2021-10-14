/* eslint-disable @next/next/no-img-element */
import styles from '../styles/components/Logo.module.css'

export function Logo({type}) {
  return (
    <h1 className={styles[`${type}LogoImage`]}>
        <img src="/favicon.png" loading="lazy" alt="Simplifi.ga" title="Simplifiga"/>
        <span>Simplifi.ga</span>
    </h1>
  )
}