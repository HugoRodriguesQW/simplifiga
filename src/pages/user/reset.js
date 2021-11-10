import { useEffect, useRef, useState } from 'react'
import styles from '../../styles/pages/Auth.module.css'
import {Form} from '@unform/web'
import Input from '../../components/Form/Input'
import * as Yup from 'yup'
import { ResetHead } from '../../components/Head/ResetHead'
import { Header } from '../../components/Header'
import Router from 'next/router'

export default function Reset () {

  const [showError, setShowError] =  useState(false)
  const [processing, setProcessing] = useState(false)

  const formRefs = {
    request: useRef(null),
    confirm: useRef(null),
    reset: useRef(null),
    finished: useRef(null)
  }

  const states = Object.keys(formRefs)
  const [targetEmail, setTargetEmail] = useState(null)
  const [currentState, setCurrentState] = useState(states[0])

  const functions = {
    async request({email}) {
      const res = await fetch(`${window.location.origin}/api/send-code`, {
        method: 'POST',
        body: JSON.stringify({
          'email': email
        })
      })
      const result = await res.json()
      return result
    },

    async confirm({code}) {
      const res = await fetch(`${window.location.origin}/api/validate-code`, {
        method: "POST",
        body: JSON.stringify({
          'email': targetEmail,
          'code': code
        })
      })

      const result = await res.json()
      return result
    },
    async reset({password}) {

      const res = await fetch(`${window.location.origin}/api/reset`, {
        method: "POST",
        body: JSON.stringify({
          'email': targetEmail,
          'password': password
        })
      })
      const result = await res.json()
      return result
    }
  }

  async function handleOnSubmit(data, {reset}) {

    setProcessing(true)
    const currentForm = formRefs[currentState].current
    try {
    const schemas = {
      request: Yup.object().shape({
        email: Yup.string()
          .email('Insira um endereço de e-mail válido')
          .required('Insira seu endereço de e-mail')
        }),
      confirm: Yup.object().shape({
        code: Yup.string()
          .max(6, 'O código inserido tem mais de 6 dígitos')
          .min(6, 'O código inserido tem menos de 6 dígitos')
          .required('Insira o código de confirmação')
      }),
      reset: Yup.object().shape({
        password: Yup.string()
        .min(8, 'A senha deve conter no mínimo 8 caracteres')
        .required('Insira uma senha'),
        confirmpass: Yup.string()
        .oneOf([data.password,''], 'As senhas não são idênticas')
        .required('Confirme a senha de acesso')
      })
    }

    const schema = schemas[currentState]
    await schema.validate(data, {abortEarly: false})
    
    const exec = functions[currentState]
    const result = await exec(data)

    switch(currentState) {
      case 'request': 
        if(result.sucess === true) {
          setCurrentState('confirm')
          setTargetEmail(data.email)
        }
        if(!result.sucess) {
          setShowError(true)
        }
        break
      case 'confirm':
        if(result.valid === true) {
          setCurrentState('reset')
        }
        if(result.valid === false) {
          const impossible = Yup.object().shape({
            code: Yup.string()
              .oneOf([Math.random().toString()], 'O código inserido não é válido')
          })

          await impossible.validate(data, {abortEarly: false})
        }
        break
      case 'reset': 
        if(!result.sucess) {
          setShowError(true)
        }

        if(result.sucess === true) {
          setCurrentState('finished')
        }
        break
    }

    setProcessing(false)
    reset()
    } catch (error) {
      setProcessing(false)
      if(error instanceof Yup.ValidationError) {
        const errorMessages = {}
        error.inner.forEach(err => {
          errorMessages[err.path] = err.message
        })
        currentForm.setErrors(errorMessages)
      }
    }
  }

  useEffect(()=> {
    if(showError) setTimeout(()=> {
      setShowError(false)
    }, 3000)
  }, [showError])

  return (
    <>
    <Header routes={[]} padding/>
    <div className={styles.container}>
    <ResetHead/>
    <div className={styles.contentBox}>
    {
      currentState == 'request' && (
      <>
      <div>
        <h1>Esqueceu a senha?</h1>
      </div>

      <Form onSubmit={handleOnSubmit} ref={formRefs.request} className={styles.form}>
        <div>
        <label>Digite o e-mail da sua conta para solicitar um código de redefinição de senha.</label>
        </div>
        <div>
          <label>E-mail</label>
          <Input  name="email" />
        </div>
        <div className={`${styles.submit} ${styles.withText}`}>
          {processing && <button type="button" className="active_button">Enviando</button>}
          {!processing && <button type="submit">Enviar</button>}
        </div>
      </Form>
      </>
      )
    }

    {
      currentState == 'confirm' && (
      <>
      <div>
        <h1>Confirmação de redefinição</h1>
      </div>

      <Form onSubmit={handleOnSubmit} ref={formRefs.confirm} className={styles.form}>
        <div>
        <p>Insira o código enviado para o e-mail informado. Verifique sua caixa de entrada e sua caixa de span. O código expira em 10 minutos.</p>
        </div>
        <div>
          <label>Código de confirmação:</label>
          <Input  name="code"  autoComplete="off" />
        </div>
        <div className={`${styles.submit} ${styles.withText}`}>
          {processing && <button type="button" className="active_button">Verificando</button>}
          {!processing && <button type="submit">Verificar</button>}
          <p><a onClick={()=> {setCurrentState('request')}}>Alterar e-mail</a></p>
        </div>
      </Form>
      </>
      )
    }

    {
      currentState == 'reset' && (
      <>
      <div>
        <h1>Redefinir senha</h1>
      </div>

      <Form onSubmit={handleOnSubmit} ref={formRefs.reset} className={styles.form}>
        <div>
        <label>Digite o e-mail da sua conta para solicitar um código de redefinição de senha.</label>
        </div>
        <div>
          <label>Senha nova</label>
          <Input  name="password" />
        </div>
        <div>
          <label>Repita a senha</label>
          <Input  name="confirmpass" />
        </div>
        <div className={`${styles.submit} ${styles.withText}`}>
          {processing && <button type="button" className="active_button">Redefinindo</button>}
          {!processing && <button type="submit">Redefinir</button>}
        </div>
      </Form>
      </>
      )
    }

    {
      currentState == 'finished' && (
      <>
      <div>
        <h1>Senha redefinida com sucesso</h1>
        <p>Tente entrar em sua conta com a nova senha.</p>
      </div>

      <div>
      <button onClick={()=> {Router.push('/user/login')}}>Entrar</button>
      </div>
      </>
      )
    }
    {
      showError && (
        <p className={styles.error}>Ocorreu um erro durante o processo. Tente novamente.</p>
      )
    }
    </div>
    </div>
    </>
    )
}