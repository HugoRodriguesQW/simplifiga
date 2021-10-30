import { useEffect, useRef, useState } from 'react'
import styles from '../../styles/pages/Auth.module.css'
import {Form} from '@unform/web'
import Input from '../../components/Form/Input'
import * as Yup from 'yup'
import { Logo } from '../../components/Logo'
import { ResetHead } from '../../components/Head/ResetHead'
import { Header } from '../../components/Header'

export default function Reset () {
  const formRefs = {
    request: useRef(null),
    confirm: useRef(null),
    reset: useRef(null)
  }

  const states = Object.keys(formRefs)
  const [currentState, setCurrentState] = useState(states[0])

  const functions = {
    request() {
      setCurrentState('confirm')
    },
    confirm() {
      setCurrentState('reset')
    },
    reset() {
      alert('Em construção...')
    }
  }

  async function handleOnSubmit(data, {reset}) {
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
        .required('Insira uma senha de acesso'),
        confirm: Yup.string()
        .oneOf([currentForm.password], 'As senhas não são idênticas')
        .required('Confirme a senha de acesso')
      })
    }

    const schema = schemas[currentState]
    await schema.validate(data, {abortEarly: false})
    
    const exec = functions[currentState]
    exec()
    reset()
    } catch (error) {
      if(error instanceof Yup.ValidationError) {
        const errorMessages = {}
        error.inner.forEach(err => {
          errorMessages[err.path] = err.message
        })
        currentForm.setErrors(errorMessages)
      }
    }
  }

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
          <button type="submit">Enviar</button>
        </div>
      </Form>
      </>
      )
    }

    {
      currentState == 'confirm' && (
      <>
      <div>
        <h1>Redefinir senha</h1>
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
          <button type="submit">Enviar</button>
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
          <label>E-mail</label>
          <Input  name="email" />
        </div>
        <div className={`${styles.submit} ${styles.withText}`}>
          <button type="submit">Enviar</button>
        </div>
      </Form>
      </>
      )
    }
    </div>
    </div>
    </>
    )
}