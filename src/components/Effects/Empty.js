import styles from '../../styles/components/Empty.module.css'

export function Empty ({height}) {

  return (
  <div className={styles.emptyContainer} style={{minHeight: height}}>
    <img src="/icons/bxs-cloud.svg" alt="Cloud" />
    <p>Nada encontrado</p>
    <span>Ainda não encontramos nada para exibir aqui.</span>
  </div>
  )
}