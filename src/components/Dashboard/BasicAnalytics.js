import { useContext } from 'react'
import { dashboardContext } from '../../contexts/DashboardContext'
import styles from '../../styles/components/BasicAnalytics.module.css'
import { Loading } from '../Effects/Loading'

export function BasicAnalytics() {

  const {
      loading,
      linkCount,
      clickCount,
      referenceCount,
      locationsCount,
      deletedCount } = useContext(dashboardContext)

  return (
    <>
    {
      loading && <div><Loading height="14rem"/></div>
    }

    {
    !loading && (
    <div className={styles.analyticsContainer}>
  
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
    )}
    </>
  )
}