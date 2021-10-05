import { useContext } from 'react'
import { ShortenerContext } from '../contexts/Shortener'
import styles from '../styles/components/Shortener.module.css'

export function Shortener() {

  const {handleShortLink, setLink, setLinkSurname, 
  isSurnameValid, isLinkInputValid} = useContext(ShortenerContext)

  return (
    <>
      <div className={styles.linkInputContainer}>
        <i>
          <input 
          required   
          type="url" 
          placeholder="Cole seu link aqui"
          onChange={(e)=> {setLink(e.target.value)}}
          ></input>
          <span className={styles.keyboardIcon}/>
        </i>
        <button onClick={(e)=>{handleShortLink()}}>Encurtar</button>
        {isLinkInputValid === false ? (
        <span className={styles.invalidInput}>Esse campo deve ser preenchido corretamente.</span>
        ) : null }
      </div>

      <div className={styles.surnameContainer}>
        <i><input 
            type="text" 
            placeholder="Apelido (opicional)"
            onChange={(e)=> {setLinkSurname(e.target.value)}}
            >
          </input>
          <span className={styles.keyboardIcon}/>
        </i>
        <p className={styles.surnameMessage}>
          {isSurnameValid === false ? ( 
          <span className={styles.invalidSurnameMessage}>Esse apelido não está disponível.</span>
          )
          : null }
          Use esse campo para definir um apelido para sua URL. Apenas caracteres de ‘0’ a ‘9’, ‘a’ a ‘z’ e ‘-’ são permitidos
        </p>
      </div>
        

      <div className={styles.mobileButtonContainer}>
        <button onClick={(e)=>{handleShortLink(e)}}>Encurtar</button> 
      </div>
    </>
  )
}