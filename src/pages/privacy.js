import Head from 'next/head'
import { Footer } from '../components/Footer'
import styles from '../styles/pages/Privacy.module.css'

export default function Privacy() {

  return (
    <>
    <div className={styles.privacyContainer}>
      <Head>
        <title>Privacidade & Termos – Simplifiga</title>
        <meta name="description" content="Entenda a política de privacidade & termos de uso do Simplifiga"/>
        <meta name="robots" content="index, follow"/>
      </Head>

      <div className={styles.logo}>
        <img src="/favicon.png" loading="lazy" alt="Simplifi.ga" title="Simplifiga"/>
        <span>Simplifi.ga</span>
      </div>
    

      <h1>Política Privacidade</h1>                    
      <p>
        A sua privacidade é importante para nós. É política do Simplifiga 
        respeitar a sua privacidade em relação a qualquer informação sua 
        que possamos coletar no site <a href="https://simplifi.ga">Simplifiga</a>, 
        e outros sites que possuímos e operamos.
      </p>                    
      
      <p>
        Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, 
        exceto quando exigido por lei.
      </p>                    
      
      <p>
        O nosso site pode ter links para sites externos que não são operados por nós. 
        Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites 
        e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.
      </p> 
      
      <p>
        O uso continuado de nosso site será considerado como aceitação de nossas práticas 
        em torno de privacidade e informações pessoais. 
      </p>

      <h2>Tecnologias e dados</h2>
      <p>
        Nosso site pode utilizar ferramentas para coletar dados dos usuários, como o seu endereço IP, 
        com o objetivo de identificar o número de visitantes. Entretanto, o mesmo não possui capacidade 
        de acessar dados do navegador e sistema operacional, nem dados pessoais como documentos, fotos, vídeos, 
        dispositivos e senhas.
      </p>

      <h2>Cookies e rede de publicidade</h2>
      <p>
        Usamos empresas de publicidade de terceiros para veicular 
        anúncios quando você visita nosso site. Estas empresas, 
        tais como nossos anunciantes, podem utilizar cookies 
        (pequenos arquivos de texto colocados em seu dispositivo) e 
        tecnologias semelhantes para coletar informações com a finalidade 
        de exibir anúncios relacionados a produtos e serviços de seu interesse.
      </p>

      <p>
        Nosso site pode exibir anúncios servidos por empresas de publicidade que 
        usam cookies para identificar as preferências do usuário e os hábitos de navegação. 
        Os usuários podem obter mais informações sobre esses cookies e privacidade 
        nos sites dessas empresas.
      </p>

      <p>
        Os navegadores da web aceitam cookies automaticamente, mas se preferir você pode 
        modificar a configuração de seu navegador para recusar cookies. 
        No entanto, isso pode afetar a forma como você é capaz de interagir com o 
        nosso site e com outros sites na Internet.
      </p>                                     
      
      <h2>Compromisso do Usuário</h2>                                
      <p>
        O usuário se compromete a fazer uso adequado dos conteúdos, serviços e da informação 
        que o Simplifiga oferece no site e com caráter enunciativo, mas não limitativo:
      </p>                                        
      
      <ul>                        
        <li>
          <b>A)</b> Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem pública;
        </li>
        <li>
          <b>B)</b> Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, jogos de azar, 
          qualquer tipo de pornografia ilegal, 
          de apologia ao terrorismo ou contra os direitos humanos;
        </li>
        <li>
          <b>C)</b> Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do Simplifiga, 
          de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou 
          quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos 
          anteriormente mencionados.
        </li>                    
      </ul>                                        
  
      <p className={styles.date}>Esta política é efetiva a partir de <strong>Outubro</strong>/<strong>2021</strong>.</p>
    
    </div>

    <Footer/>
    </>
  )
}