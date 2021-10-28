import { useRef } from 'react'
import styles from '../../styles/pages/Auth.module.css'
import {Form} from '@unform/web'
import Input from '../../components/Form/Input'
import * as Yup from 'yup'
import { Logo } from '../../components/Logo'
import Link from 'next/link'
import { RegisterHead } from '../../components/Head/RegisterHead'
import { Header } from '../../components/Header'
 
export default function Register () {
  
  const formRef = useRef(null)

  async function handleOnSubmit(data, {reset}) {
    try {
    const schema = Yup.object().shape({
      name: Yup.string().required('Insira seu nome completo'),
      company: Yup.string().required('Insira o nome da sua empresa'),
      email: Yup.string()
        .email('Insira um endereço de e-mail válido')
        .required('Insira seu endereço de e-mail'),
      password: Yup.string()
        .min(8, 'A senha deve conter no mínimo 8 caracteres')
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
    <RegisterHead/>
    <Header routes={['/']}  padding />
    <div className={styles.container}>
      <div className={styles.contentBox}>
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
          <label>E-mail</label>
          <Input  name="email" />
        </div>
        <div>
          <label>Senha</label>
          <Input  name="password"  autoComplete="off"/>
        </div>

        <div className={`${styles.submit} ${styles.withText}`}>
          <button type="submit">Criar conta</button>
          <p>Ao se cadastrar, você concorda com os Termos & Privacidade da Simplifiga.</p>
        </div>
      </Form>
      </div>
    </div>
    </>
  )
}