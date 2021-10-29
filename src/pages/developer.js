import { Header } from "../components/Header";
import styles from '../styles/pages/Developer.module.css'
import { useEffect, useState } from "react";
import { DeveloperHead } from "../components/Head/DeveloperHead";

export default function Developer({logged}) {


  const indexes = [['introduction', 'Introdução'], ['usage', 'Utilização']]
  const [currentIndex, setCurrentIndex] = useState()

  useEffect(()=> {
    setCurrentIndex(indexes[0][0])
    document.addEventListener('scroll', ()=> {
      let current = indexes[0][0]
      let scrolled = document.scrollingElement.scrollTop + 60
      indexes.map((ind)=> {
        const offset = document.getElementById(ind[0])?.offsetTop
        if(!offset) return {id: "", is: false}
        return {id: ind[0], is: offset  <= scrolled}
      }).forEach((ind)=> {
        if(ind.is) current = ind.id
      })
      if(current === currentIndex) return
      setTimeout(()=> {
      setCurrentIndex(current)}, 200)
    }) 
  }, [])
  
  return (
    <>
    <DeveloperHead/>
     { logged ? (
      <Header fixed padding routes={['/dashboard', '/developer', '/','Sair']}/>
    ) : (
      <Header fixed padding routes={[ '/user/register', '/user/login', '/']}/>
    )
    }

    <div className={styles.developerContainer}>
      <aside className={styles.menu}>
        {
          indexes.map((keys, index)=> {
            return (
              <a 
              key={keys[0]+index} className={keys[0] === currentIndex? styles.currentIndex : null}
              onClick={()=> {setCurrentIndex(keys[0])}} href={`#${keys[0]}`}>{keys[1]}
              </a>
            )
          })
        }
      </aside>
      <div className={styles.developerContent}>
        <div>
        <h3 id="introduction" >A API do Simplifiga</h3>
        <p>Este é um parágrafo Este é um parágrEste é um parágrafo Este é um parágrafo Este é um parágrafo Este é um parágrafo Este é um parágrafo Este é um parágrafo</p>
        </div>
      </div>
    </div>
    </>
  )
}