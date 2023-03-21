import Head from "next/head"
import Image from "next/image"
import styles from '../../styles/home.module.scss'
import logoImg from '../../../public/logo.svg'

import Link from "next/link"
import Button from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { FormEvent, useState, useContext } from "react"

import {toast} from 'react-toastify'

import { AuthContext } from '../../contexts/AuthContext'

export default function SignUp() {
  const { signUp } = useContext(AuthContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  const handleSignUp = async (event: FormEvent) => {
    event.preventDefault()

    if (name === '' || email === '' || password === '') {
      toast.warning("Preencha todos os campos")
      return
    }
    setLoading(true)

    let data = {
      name,
      email,
      password
    }

    await signUp(data)

    setLoading(false)
  }
  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)

  }
  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)

  }
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  return (
    <>
      <Head>
        <title>Faça seu cadastro agora!</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} className={styles.logo} alt="Logo Corleone Pizza" />

        <div className={styles.login}>
          <h1>Criando sua conta</h1>
          <form onSubmit={handleSignUp}>
            <Input value={name} onChange={handleName} placeholder="Digite seu nome" type="text" />

            <Input value={email} onChange={handleEmail} placeholder="Digite seu email" type="text" />

            <Input value={password} onChange={handlePassword} placeholder="Sua Senha" type="password" />

            <Button type="submit" loading={loading}>Cadastrar</Button>
          </form>
          <Link className={styles.text} href="/">
            Já possui uma conta? Faça login
          </Link>
        </div>
      </div>
    </>
  )
}
