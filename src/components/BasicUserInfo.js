import { useContext } from 'react'
import { userContext } from '../contexts/UserContext'
import styles from '../styles/components/BasicUserInfo.module.css'
import {noBackground} from '../styles/pages/Dashboard.module.css'
import copy from 'copy-to-clipboard'

export function BasicUserInfo() {

  const {name, token, company} = useContext(userContext)

  return (
    <div className={`${styles.userInfoContainer} ${noBackground}`}>
        <div>
          <span>{company}</span>
          <strong>{name.split(' ').filter((word, i, all)=> {
            return i === 0 || i === all.length -1
          }).join(' ')}</strong>
        </div>
        <div>
          <span>Token</span>
          <div className={styles.tokenContainer}>
            <span>
              {token}
              <button onClick={()=> {copy(token)}}><img src="/icons/copy-alt.svg" alt="copy" /></button>
            </span>
          </div>
        </div>
    </div>
  )
}