import styles from '../styles/components/BasicAnalytics.module.css'

export function BasicAnalytics() {

  return (
    <div className={styles.analyticsContainer}>
        <div className={styles.cell}>
          <span>Links</span>
          <strong>250</strong>
        </div>
        <div className={styles.cell}>
          <span>Cliques</span>
          <strong>67890</strong>
        </div>
        <div className={styles.cell}>
          <span>Referências</span>
          <strong>4</strong>
        </div>
        <div className={styles.cell}>
          <span>Locais</span>
          <strong>12</strong>
        </div>
        <div className={styles.cell}>
          <span>Excluídos</span>
          <strong>24</strong>
        </div>
    </div>
  )
}