import { useRef } from 'react'
import styles from '../../styles/pages/Auth.module.css'
import {Form} from '@unform/web'
import Input from '../../components/Form/Input'
import * as Yup from 'yup'
import { Logo } from '../../components/Logo'
import Link from 'next/link'
import Head from 'next/head'
import { LoginHead } from '../../components/Head/LoginHead'
import { Header } from '../../components/Header'

export default function Login () {
  const formRef = useRef(null)

  async function handleOnSubmit(data, {reset}) {
    try {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email('Insira um endereço de e-mail válido')
        .required('Insira seu endereço de e-mail'),
      password: Yup.string()
        .required('Insira uma senha de acesso')
    })
    await schema.validate(data, {abortEarly: false})
    reset()
    } catch (error) {
      if(error instanceof Yup.ValidationError) {
        const errorMessages = {}
        error.inner.forEach(err => {
          errorMessages[err.path] = err.message
        })
        formRef.current.setErrors(errorMessages)
      }
    }
  }

  return (
    <>
    <LoginHead/>
    <Header routes={['/']}  padding />
    <div className={styles.container}>
      <div className={styles.contentBox}>
      <div>
        <h1>Conect-se para usar nossos serviços</h1>
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
          <button type="submit">Entrar</button>
          <p><Link href="/user/reset" >Esqueceu a senha?</Link></p>
        </div>
      </Form>
      </div>
    </div>
    </>
  )
}