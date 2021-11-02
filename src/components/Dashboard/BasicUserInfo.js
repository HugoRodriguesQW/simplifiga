import { useContext, useState } from 'react'
import { userContext } from '../../contexts/UserContext'
import styles from '../../styles/components/BasicUserInfo.module.css'
import {noBackground} from '../../styles/pages/Dashboard.module.css'
import copy from 'copy-to-clipboard'

export function BasicUserInfo() {

  const {name, token, company} = useContext(userContext)
  const displayToken = `${new Array(token.length-4).fill('•').join('')}${token.slice(token.length-4)}`

  const [showGhostToken, setGhostToken] = useState(false)
  const firstLastName = 
  name.split(' ').filter((word, i, all)=> {
    return i === 0 || i === all.length -1
  }).join(' ')

  function handleCopyTokenDown () {
    copy(token)
    if(showGhostToken) return
    setGhostToken(true)
    setTimeout(()=> {
      setGhostToken(false)
    }, 800)
  }

  return (
    <div className={`${styles.userInfoContainer} ${noBackground}`}>
        <div>
          <div>
          <span>Token de acesso</span>
          <div className={styles.tokenInfo}>
          <span>{company}</span>
          <span>{firstLastName}</span>
          </div>
          </div>
          <div className={styles.tokenContainer} onClick={handleCopyTokenDown}>
            <span className={`${styles.ghostToken} ${showGhostToken ? styles.enable : null}`}>
              {displayToken}
              </span>
            <span>
            {displayToken}
              <button><img src="/icons/copy-alt.svg" alt="copy" /></button>
            </span>
          </div>
        </div>
    </div>
  )
}