import styles from '../../styles/components/Loading.module.css'
export function Loading ({height}) {

  return (
    <div className={styles.container} style={{minHeight: height}}>
      <div>
        <div className={styles.box}>
          l
        </div>
        <div className={styles.box}>
          o
        </div>
        <div className={styles.box}>
          a
        </div>
        <div className={styles.box}>
          d
        </div>
      </div>
    </div>
  )
}