import { useContext } from 'react'
import { ShortenerContext } from '../contexts/Shortener'
import errors from '../errors.json'
import styles from '../styles/components/Error.module.css'

export function Error() {
  
  const {error} = useContext(ShortenerContext)

  return (
    <>
    { error ? (
      <div className={styles.errorContainer}>
        {errors[100].message}
      </div>
    ): null }
    </>
  )
}