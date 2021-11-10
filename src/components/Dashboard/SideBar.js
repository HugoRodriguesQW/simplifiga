import styles from '../../styles/components/SideBar.module.css'
import Link from 'next/link'

export function SideBar({current}) {

  const links = [
    {name: 'Dashboard', target: "/dashboard"},
    {name: 'Referências', target: "/dashboard/references"},
    {name: 'Localização', target: "/dashboard/locations"},
    {name: "Links", target: "/dashboard/links"},
    {name: 'API', target: "/developer", blank: true},
  ]
  return (
    <aside className={`${styles.container}`}>
      {
        links.map((data, index)=> {
          if(data.blank) {
            return <a key={data.name+index} href={data.target} target="_blank" rel="noreferrer">{data.name}</a>
          }
          return  (
          <div key={data.name+index}  className={data.target === current ? styles.currentIndex : null}>
          <Link 
          href={data.target}>
              {data.name}
          </Link>
          </div>
          )
      })
    }
    </aside>
  )
}