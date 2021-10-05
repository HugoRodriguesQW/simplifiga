import { Shortener } from "./Shortener";
import { Shortened } from "./Shortened";
import { useContext } from "react";
import { ShortenerContext } from "../contexts/Shortener";
import styles from '../styles/components/Shortener.module.css'

export function MainComponent () {

  const {isShortened} = useContext(ShortenerContext)

  return (
    <main className={styles.shortenerContainer}>
        {isShortened ? (
          <Shortened/>
        ): (
          <Shortener/>
        )}
      </main>
  )
}