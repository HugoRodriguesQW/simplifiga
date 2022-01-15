import { useEffect, useState } from "react"
import styles from '../../styles/components/Developer/DeveloperSideBar.module.css'

export function DeveloperSideBar({content}) {

  const indexes = content.document.map((elem)=> {
    return elem.anchor
  }).filter((value)=> { return value != null})

  const [currentIndex, setCurrentIndex] = useState()

  useEffect(()=> {
    document.addEventListener('load', setCurrentIndex(indexes[0][0]))
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
    <aside className={styles.menu}>
        {
          indexes.map((keys, index)=> {
            const mykey = keys[0]
            return (
              <a 
              key={mykey+index} className={mykey === currentIndex? styles.currentIndex : null}
              onClick={()=> {setCurrentIndex(mykey)}} href={`#${mykey}`}>{keys[1]}
              </a>
            )
          })
        }
      </aside>
  )
}