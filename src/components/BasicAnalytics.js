import styles from '../styles/components/BasicAnalytics.module.css'
import {building} from '../styles/pages/Dashboard.module.css'

export function BasicAnalytics() {

  return (
    <div className={`${styles.analyticsContainer}  ${building}`}>
        <div className={styles.cell}>
          <span>Links</span>
          <strong>0</strong>
        </div>
        <div className={styles.cell}>
          <span>Cliques</span>
          <strong>0</strong>
        </div>
        <div className={styles.cell}>
          <span>Referências</span>
          <strong>0</strong>
        </div>
        <div className={styles.cell}>
          <span>Locais</span>
          <strong>0</strong>
        </div>
        <div className={styles.cell}>
          <span>Excluídos</span>
          <strong>0</strong>
        </div>
    </div>
  )
}