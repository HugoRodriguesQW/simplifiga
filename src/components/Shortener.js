import { useContext } from 'react'
import { ShortenerContext } from '../contexts/Shortener'
import styles from '../styles/components/Shortener.module.css'

export function Shortener() {

  const {handleShortLink} = useContext(ShortenerContext)
  console.info('Shorener on')
  return (
    <>
      <div className={styles.linkInputContainer}>
        <i>
          <input type="text" placeholder="Cole seu link aqui"></input>
          <span className={styles.keyboardIcon}/>
        </i>
        <button onClick={(e)=>{handleShortLink(e)}}>Encurtar</button> 
      </div>

      <div className={styles.surnameContainer}>
        <i><input type="text" placeholder="Apelido (opicional)">
          </input>
          <span className={styles.keyboardIcon}/>
        </i>
        <p>Use esse campo para definir um apelido para sua URL. Apenas caracteres de ‘0’ a ‘9’, ‘a’ a ‘z’ e ‘-’ são permitidos</p>
      </div>
        

      <div className={styles.mobileButtonContainer}>
        <button onClick={(e)=>{handleShortLink(e)}}>Encurtar</button> 
      </div>
    </>
  )
}