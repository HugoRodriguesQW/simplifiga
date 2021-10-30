import { useEffect, useRef, useState } from 'react'
import styles from '../../styles/pages/Auth.module.css'
import {Form} from '@unform/web'
import Input from '../../components/Form/Input'
import * as Yup from 'yup'
import Link from 'next/link'
import Router from 'next/router'

import { RegisterHead } from '../../components/Head/RegisterHead'
import { Header } from '../../components/Header'

export default function Register () {
  
  const formRef = useRef(null)
  const [isComplete, setIsComplete] = useState(false)
  const [processing, isProcessing] = useState(false)

  async function handleOnSubmit(data, {reset}) {
    if(processing) return
    try {
    isProcessing(true)
    let mailSearch = Math.random().toString()
    if(data.email) {
      mailSearch = await Finder({key: 'email', data: data.email, collection: 'clients'})
    }
    
    const schema = Yup.object().shape({
      name: Yup.string().required('Insira seu nome completo'),
      company: Yup.string().required('Insira o nome da sua empresa'),
      email: Yup.string()
        .email('Insira um endereço de e-mail válido')
        .notOneOf([mailSearch], 'Já existe uma conta com este endereço de e-mail')
        .required('Insira seu endereço de e-mail'),
      password: Yup.string()
        .min(8, 'A senha deve conter no mínimo 8 caracteres')
        .required('Insira uma senha de acesso')
    })
    await schema.validate(data, {abortEarly: false})
    await onValidate(data)
    reset()
    } catch (error) {
      isProcessing(false)
      if(error instanceof Yup.ValidationError) {
        const errorMessages = {}
        error.inner.forEach(err => {
          errorMessages[err.path] = err.message
        })
        formRef.current.setErrors(errorMessages)
      }
    }
  }

  async function onValidate(data) {

    await fetch(`${window.location.origin}/api/register`, {
      method: "POST",
      body: JSON.stringify({...data, appToken: process.env.NEXT_PUBLIC_APP_TOKEN})
    })

    isProcessing(false)
    setIsComplete(true)
    setTimeout(()=> { Router.push('/user/login')}, 5000)
  }

  useEffect(()=> {
    const user = localStorage.getItem('user')
    if(user) return Router.push('/dashboard')
  }, [])

  return (
    <>
    <RegisterHead/>
    <Header routes={['/']}  padding />
    <div className={styles.container}>
      <div className={styles.contentBox}>
      {isComplete ? (
      <>
      <div>
        <h1>Cadastro realizado com sucesso</h1>
        <p>Aguarde ou clique <Link href="/user/login" >aqui</Link> para entrar na sua conta</p>
      </div>
      </>
      ) : (
      <>
      <div>
        <h1>Cadastre-se para usar nossos serviços</h1>
        <p>Já tem uma conta? Faça <Link href="/user/login" >login</Link></p>
      </div>

      <Form onSubmit={handleOnSubmit} ref={formRef} className={styles.form}>
        <div className={styles.doubleField}>
          <div>
            <label>Nome Completo</label>
            <Input  name="name" />
          </div>
          <div>
            <label>Empresa</label>
            <Input  name="company" />
          </div>
        </div>
        <div>
          <label>E-email</label>
          <Input  name="email" />
        </div>
        <div>
          <label>Senha</label>
          <Input  name="password"  autoComplete="off"/>
        </div>

        <div className={`${styles.submit} ${styles.withText}`}>
          {processing ? (
            <button className="active_button">Criando</button>
          ): (
            <button type="submit">Criar conta</button>
          )}
          <p>Ao se cadastrar, você concorda com os <a href="https://simplifi.ga/privacy" target="_blank" rel="noreferrer">Termos & Privacidade</a> da Simplifiga.</p>
        </div>
      </Form>
      </>
      )}
      </div>
    </div>
    </>
  )
}

export async function Finder({key, data, collection}) {
  let response = null
    if(data) {
      const f =
      await fetch(`${window.location.origin}/api/find`, {
      method: "POST",
      body: JSON.stringify({
        key,
        data, 
        collection,
        appToken: process.env.NEXT_PUBLIC_APP_TOKEN})
    })
    const search = await f.json()
    response = Object.values(search)[0]?.[key] ?? null
    }
    return response
}
