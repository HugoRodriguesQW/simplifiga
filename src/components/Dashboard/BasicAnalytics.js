import { useContext } from 'react'
import { dashboardContext } from '../../contexts/DashboardContext'
import styles from '../../styles/components/BasicAnalytics.module.css'
import {building} from '../../styles/components/global.module.css'

export function BasicAnalytics() {

  const {
      linkCount,
      clickCount,
      referenceCount,
      locationsCount,
      deletedCount } = useContext(dashboardContext)

  return (
    <div className={`${styles.analyticsContainer}  ${building}`}>
        <div className={styles.cell}>
          <span>Links</span>
          <strong>{linkCount}</strong>
        </div>
        <div className={styles.cell}>
          <span>Cliques</span>
          <strong>{clickCount}</strong>
        </div>
        <div className={styles.cell}>
          <span>Referências</span>
          <strong>{referenceCount}</strong>
        </div>
        <div className={styles.cell}>
          <span>Locais</span>
          <strong>{locationsCount}</strong>
        </div>
        <div className={styles.cell}>
          <span>Excluídos</span>
          <strong>{deletedCount}</strong>
        </div>
    </div>
  )
}