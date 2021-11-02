import { useEffect, useRef, useState } from 'react'
import styles from '../../styles/pages/Auth.module.css'
import {Form} from '@unform/web'
import Input from '../../components/Form/Input'
import * as Yup from 'yup'
import Link from 'next/link'
import { serverCrypto, webCrypto } from '../../utils/crypto'
import { LoginHead } from '../../components/Head/LoginHead'
import { Header } from '../../components/Header'
import {Finder} from './register'
import Router from 'next/router'

export default function Login (props) {
  const formRef = useRef(null)
  const [processing, isProcessing] = useState(false)
  const [show, isShow] = useState(false)

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
    Router.reload()
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
    isShow(true)
  }, [])

  useEffect(()=> {
    const data = 'Where are you?'
    const encoder = new webCrypto({bits: 1024})
    const serverEncoder = new serverCrypto(props.publicAppKey)
    console.info('Sending a message to server:', data)
  
    fetch(`${window.location.origin}/api/crypto`, {
      method: "POST",
      body: JSON.stringify({
        encrypted: serverEncoder.encrypt(data),
        clientKey: encoder.getPublicKey()
      })
    })
    .then(async (response) => {
      const result = await response.json()
      console.warn("> Receive message encrypted with a public client key:")
      console.log(result.encrypted)
      console.warn('Decrypted:', encoder.decrypt(result.encrypted))
    })
    },[])

  return (
    <>
    { show ? (
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
    ) :  null
    }
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

export async function getServerSideProps () {
  return {
    props: {
      publicAppKey: process.env.PUBLIC_KEY
    }
  }
}