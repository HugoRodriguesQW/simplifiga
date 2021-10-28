import { useEffect, useRef, useState } from 'react'
import styles from '../../styles/pages/Auth.module.css'
import {Form} from '@unform/web'
import Input from '../../components/Form/Input'
import * as Yup from 'yup'
import Link from 'next/link'
import { LoginHead } from '../../components/Head/LoginHead'
import { Header } from '../../components/Header'
import {Finder} from './register'
import Router from 'next/router'

export default function Login () {
  const formRef = useRef(null)
  const [processing, isProcessing] = useState(false)

  async function handleOnSubmit(data, {reset}) {
    isProcessing(true)
    try {
    let foundAccount = data.email ?? Math.random().toString()
    if(data.email) foundAccount = await Finder({key: 'email', data: data.email, collection: 'clients'})
    
    const schema = Yup.object().shape({
      email: Yup.string()
      .email('Insira um endereço de e-mail válido')
      .oneOf([foundAccount], 'Esta conta não existe.')
      .required('Insira seu endereço de e-mail'),
      password: Yup.string()
        .required('Insira uma senha de acesso')
    })

    await schema.validate(data, {abortEarly: false})
    
    const login = await LoginData(data)
    const passwordSchema = Yup.object().shape({
      password: Yup.string()
      .oneOf([login.password], 'A senha está incorreta')
    })

    await passwordSchema.validate(data, {abortEarly: false})
    isProcessing(false)
    const date = new Date()
    date.setHours(date.getHours()+24)
    localStorage.setItem('user', JSON.stringify({
      name: login.name,
      token: login.token,
      email: login.email,
      company: login.company,
      lifetime: date
    }))
    Router.push('/dashboard')
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

  useEffect(()=> {
    const user = localStorage.getItem('user')
    if(user) return Router.push('/dashboard')
  }, [])

  return (
    <>
    <LoginHead/>
    <Header routes={['/']}  padding />
    <div className={styles.container}>
      <div className={styles.contentBox}>
      <div>
        <h1>Conecte-se para usar nossos serviços</h1>
        <p>Não tem uma conta? <Link href="/user/register" >Registre-se</Link></p>
      </div>

      <Form onSubmit={handleOnSubmit} ref={formRef} className={styles.form}>
        <div>
          <label>E-mail</label>
          <Input  name="email" />
        </div>
        <div>
          <label>Senha</label>
          <Input  name="password" />
        </div>

        <div className={`${styles.submit} ${styles.withText}`}>
          {processing? (
          <button className="active_button">Entrando</button> 
          ) : (
          <button type="submit">Entrar</button>
          )}
          <p><Link href="/user/reset" >Esqueceu a senha?</Link></p>
        </div>
      </Form>
      </div>
    </div>
    </>
  )
}

export async function LoginData({email, password}) {
  let response = null
    if(email && password) {
      const f =
      await fetch(`${window.location.origin}/api/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password, 
        appToken: process.env.NEXT_PUBLIC_APP_TOKEN})
    })
    const search = await f.json()
    response = search
    }
    return response
}