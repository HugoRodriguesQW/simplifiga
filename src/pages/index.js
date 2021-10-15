/* eslint-disable @next/next/no-img-element */

import { MainComponent } from '../components/MainComponent'
import styles from '../styles/pages/Home.module.css'
import { Error } from '../components/Error'
import { Footer } from '../components/Footer'
import { IndexHead } from '../components/Head/IndexHead'
import { Logo } from '../components/Logo'
import { Ad_001, Ad_002 } from '../components/advertisement'

export default function Home() {

  return (
    <>
    <IndexHead/>

    <div className={styles.container}>
      <Logo type="full" />
      <MainComponent/>
      <Error/>
    </div>

    <div id="content" className={styles.contentBox}>
    <Ad_001/>
    
        <h2>Encurtar links de forma simples e fácil!</h2>
        <p>
          O Simplifiga é um encurtador de links longos tornando-os simples, curtos e memoráveis. Cole seu link completo, defina um apelido para o link (opicional) e clique em encurtar. Agora é só copiar o link simplificado e deixar o resto com o Simplifiga.
        </p>
        <p>
          Você pode reduzir URLs longas e usá-las em posts, blogs, fórums, mensagens e outros. Esta plataforma é totalmente segura e permite tornar seus links pequenos e memoráveis.
        </p>

        <h2>Benefícios do Simplifiga</h2>
        <p>
          Nossa plataforma foi pensada para ser leve e acessível em diversos dispositivos e navegadores. Simplicidade é nosso lema. Conseguimos fazer o redirecionamento em apenas 780ms, enquanto outros levam até 1,41 segundos para redirecionar.
        </p>
        <p>
          Apenas exibimos anúncios durante o encurtamento com o objetivo de reduzir o tempo de redirecionamento. Sem telas, sem mensagens, rápido e direto.
        </p>

        <div className={styles.benefitBox}>
          <div className={styles.benefit}>
            <img src="/icons/bxs-award.svg" loading="lazy" alt="Award" title="Award"/>
            <h3>Simples</h3>
            <p>Links simples e memoráveis</p>
          </div>

          <div className={styles.benefit}>
            <img src="/icons/bxs-timer.svg" loading="lazy" alt="Timer" title="Timer"/>
            <h3>Rápido</h3>
            <p>Redirecionamento em apenas 780ms</p>
          </div>

          <div className={styles.benefit}>
            <img src="/icons/bxs-badge-dollar.svg" loading="lazy" alt="Dollar" title="Dollar"/>
            <h3>Grátis</h3>
            <p>Quando quiser e sempre que quiser</p>
          </div>

          <div className={styles.benefit}>
            <img src="/icons/bx-block.svg" loading="lazy" alt="Simplifi.ga" title="Simplifiga"/>
            <h3>5 segundos</h3>
            <p>Sem telas de espera para exibir anúncios</p>
          </div>

          <div className={styles.benefit}>
            <img src="/icons/bxs-layout.svg" loading="lazy" alt="Simplifi.ga" title="Simplifiga"/>
            <h3>Responsivo</h3>
            <p>Totalmente compatível com vários tamanhos de telas</p>
          </div>
        </div>
        <Ad_002/>
    </div>

    <Footer/>
    </>
    
  )
}
