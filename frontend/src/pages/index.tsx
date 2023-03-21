import Head from "next/head"
import Image from "next/image"
import Link from "next/link"

import styles from '../styles/home.module.scss'
import logoImg from '../../public/logo.svg'

import { AuthContext } from "../contexts/AuthContext"
import { useContext, FormEvent, useState } from 'react'

import { Input } from "../components/ui/Input"
import Button from "../components/ui/Button"

import { toast } from 'react-toastify'

import { canSSRGuest } from '../utils/canSSRGuest'


export default function Home() {
  const { signIn } = useContext(AuthContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)


  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault()

    if (email === '' || password === '') {
      toast.warning("Preencha todos os campos")
      return
    }

    setLoading(true)

    let data = {
      email,
      password
    }

    await signIn(data)
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title> Corleone Pizza - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} className={styles.logo} alt="Logo Corleone Pizza" />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input value={email} onChange={handleEmail} placeholder="Digite seu email" type="text" />
            <Input value={password} onChange={handlePassword} placeholder="Sua Senha" type="password" />
            <Button type="submit" loading={loading}>Acessar</Button>
          </form>
          <Link className={styles.text} href="/signup">
            Não possui uma conta? Cadastre-se
          </Link>
        </div>
      </div>
    </>
  )
}


export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})