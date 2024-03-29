import { useContext, useState } from 'react'
import { ShortenerContext } from '../contexts/Shortener'
import styles from '../styles/components/Shortener.module.css'
import copy from 'copy-to-clipboard'
import { ShareSocialShortened } from './ShareSocialShortened'

export function Shortened() {

  const [copyToClip, setCopyToClip] = useState(false)
  const {handleShortOtherLink, shortednedLink} = useContext(ShortenerContext)

  function handleCopyToClipBoard() {
    if (copyToClip) return
    copy(shortednedLink)
    setCopyToClip(true)
    setTimeout(()=> {
      setCopyToClip(false)
    }, 2000)
  }

  return(
    <>
    <div className={styles.shortedLinkContainer}>
      <i><input type="text" value={shortednedLink} readOnly="readonly"></input></i>
        <button onClick={handleCopyToClipBoard} 
          className={`${styles.overflow} ${copyToClip ? styles.enable : 'disable'}`}>
          <span className={styles.copyAltIcon}/>
          <span className={styles.copyPopBubble}>URL Copiada</span>
          <span className={styles.copyPopRect}>URL Copiada para transferência</span>
          <strong>Copiar para transferir</strong>
        </button>
    </div>

    <div className={styles.shortenedShare}>
      <ShareSocialShortened shareUrl={shortednedLink}/>
      <button  className={styles.shortMoreButton} onClick={()=>{handleShortOtherLink()}}> Encurtar mais <span/></button>
    </div>
    </>
  )
}