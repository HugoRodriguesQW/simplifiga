import styles from '../../styles/components/BasicAnalytics.module.css'
import {building} from '../../styles/components/global.module.css'

export function BasicAnalytics() {

  return (
    <div className={`${styles.analyticsContainer}  ${building}`}>
        <div className={styles.cell}>
          <span>Links</span>
          <strong>210</strong>
        </div>
        <div className={styles.cell}>
          <span>Cliques</span>
          <strong>3434</strong>
        </div>
        <div className={styles.cell}>
          <span>Referências</span>
          <strong>9</strong>
        </div>
        <div className={styles.cell}>
          <span>Locais</span>
          <strong>12</strong>
        </div>
        <div className={styles.cell}>
          <span>Excluídos</span>
          <strong>7</strong>
        </div>
    </div>
  )
}