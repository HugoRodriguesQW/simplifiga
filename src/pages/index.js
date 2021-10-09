/* eslint-disable @next/next/no-img-element */

import Head from 'next/head'
import { MainComponent } from '../components/MainComponent'
import styles from '../styles/pages/Home.module.css'
import { Error } from '../components/Error'
import { Footer } from '../components/Footer'
import { useEffect } from 'react'

export default function Home() {

  useEffect(()=> {
    async function loadC() {
      var host = 'www.themoneytizer.com';
      var element = document.createElement('script');
      var firstScript = document.getElementsByTagName('script')[0];
      var url = 'https://quantcast.mgr.consensu.org'
          .concat('/choice/', '6Fv0cGNfc_bw8', '/', host, '/choice.js');
      var uspTries = 0;
      var uspTriesLimit = 3;
      element.async = true;
      element.type = 'text/javascript';
      element.src = url;
  
      firstScript.parentNode.insertBefore(element, firstScript);
  
      function makeStub() {
          var TCF_LOCATOR_NAME = '__tcfapiLocator';
          var queue = [];
          var win = window;
          var cmpFrame;
  
          function addFrame() {
              var doc = win.document;
              var otherCMP = !!(win.frames[TCF_LOCATOR_NAME]);
  
              if (!otherCMP) {
                  if (doc.body) {
                      var iframe = doc.createElement('iframe');
  
                      iframe.style.cssText = 'display:none';
                      iframe.name = TCF_LOCATOR_NAME;
                      doc.body.appendChild(iframe);
                  } else {
                      setTimeout(addFrame, 5);
                  }
              }
              return !otherCMP;
          }
  
          function tcfAPIHandler() {
              var gdprApplies;
              var args = arguments;
  
              if (!args.length) {
                  return queue;
              } else if (args[0] === 'setGdprApplies') {
                  if (
                      args.length > 3 &&
                      args[2] === 2 &&
                      typeof args[3] === 'boolean'
                  ) {
                      gdprApplies = args[3];
                      if (typeof args[2] === 'function') {
                          args[2]('set', true);
                      }
                  }
              } else if (args[0] === 'ping') {
                  var retr = {
                      gdprApplies: gdprApplies,
                      cmpLoaded: false,
                      cmpStatus: 'stub'
                  };
  
                  if (typeof args[2] === 'function') {
                      args[2](retr);
                  }
              } else {
                  queue.push(args);
              }
          }
  
          function postMessageEventHandler(event) {
              var msgIsString = typeof event.data === 'string';
              var json = {};
  
              try {
                  if (msgIsString) {
                      json = JSON.parse(event.data);
                  } else {
                      json = event.data;
                  }
              } catch (ignore) {}
  
              var payload = json.__tcfapiCall;
              if (payload) {
                  window.__tcfapi(
                      payload.command,
                      payload.version,
                      function(retValue, success) {
                          var returnMsg = {
                              __tcfapiReturn: {
                                  returnValue: retValue,
                                  success: success,
                                  callId: payload.callId
                              }
                          };
                          if (msgIsString) {
                              returnMsg = JSON.stringify(returnMsg);
                          }
                          event.source.postMessage(returnMsg, '*');
                      },
                      payload.parameter
                  );
              }
          }
  
          while (win) {
              try {
                  if (win.frames[TCF_LOCATOR_NAME]) {
                      cmpFrame = win;
                      break;
                  }
              } catch (ignore) {}
  
              if (win === window.top) {
                  break;
              }
              win = win.parent;
          }
          if (!cmpFrame) {
              addFrame();
              win.__tcfapi = tcfAPIHandler;
              win.addEventListener('message', postMessageEventHandler, false);
          }
      };
  
      if (typeof module !== 'undefined') {
          module.exports = makeStub;
      } else {
          makeStub();
      }
  
      var uspStubFunction = function() {
          var arg = arguments;
          if (typeof window.__uspapi !== uspStubFunction) {
              setTimeout(function() {
                  if (typeof window.__uspapi !== 'undefined') {
                      window.__uspapi.apply(window.__uspapi, arg);
                  }
              }, 500);
          }
      };
  
      var checkIfUspIsReady = function() {
          uspTries++;
          if (window.__uspapi === uspStubFunction && uspTries < uspTriesLimit) {
              console.warn('USP is not accessible');
          } else {
              clearInterval(uspInterval);
          }
      };
  
      if (typeof window.__uspapi === 'undefined') {
          window.__uspapi = uspStubFunction;
          var uspInterval = setInterval(checkIfUspIsReady, 6000);
      }
      }
      loadC()
  }, [])

  return (
    <>
    <div className={styles.container}>
      <Head>

        <title>Simplifiga</title>
        <meta name="title" content="Simplifiga" />
        <meta name="description" content="Encurtador e Simplificador de URLs para torná-las memoráveis." />
        <meta name="robots" content="index, follow"/>
        <link rel="canonical" href="https://simplifi.ga/" />

        { /* SEO TAG */ }
        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://simplifi.ga/"/>
        <meta property="og:title" content="Simplifiga"/>
        <meta property="og:description" content="Encurtador e Simplificador de URLs para torná-las memoráveis."/>
        <meta property="og:image" content="https://raw.githubusercontent.com/HugoRodriguesQW/simplifiga/main/banner.png"/>
        <meta property="og:url" content="https://simplifi.ga/" />
        <meta property="og:site_name" content="Simplifiga" />

        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content="https://simplifi.ga/"/>
        <meta property="twitter:title" content="Simplifiga"/>
        <meta property="twitter:description" content="Encurtador e Simplificador de URLs para torná-las memoráveis."/>
        <meta property="twitter:image" content="https://raw.githubusercontent.com/HugoRodriguesQW/simplifiga/main/banner.png"/>
      
      </Head>

      <h1 className={styles.titleLogoImage}>
        <img src="/favicon.png" loading="lazy" alt="Simplifi.ga" title="Simplifiga"/>
        <span>Simplifi.ga</span>
      </h1>

      <MainComponent/>

      <Error/>
    </div>

    <div id="content" className={styles.contentBox}>
        <h2>Simplifique suas URLs de forma simples e fácil!</h2>
        <p>
          O Simplifiga é uma ferramenta gratuita para encurtar links longos tornando-os curtos e memoráveis. Cole seu link completo, defina um apelido para o link (opicional) e clique em encurtar. Agora é só copiar o link simplificado e deixar o resto com o Simplifiga.
        </p>
        <p>
          Você pode encurtar suas URLs longas e usá-las em posts, blogs, fórums, mensagens e outros. Esta plataforma é totalmente segura e permite tornar seus links pequenos e memoráveis.
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
        
    </div>
    <Footer/>
    </>
    
  )
}
