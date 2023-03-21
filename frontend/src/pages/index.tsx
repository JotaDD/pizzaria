import Head from "next/head"
import Image from "next/image"
import Link from "next/link"

import styles from '../styles/home.module.scss'
import logoImg from '../../public/logo.svg'

import { AuthContext } from "../contexts/AuthContext"
import { useContext, FormEvent } from 'react'

import { Input } from "../components/ui/Input"
import Button from "../components/ui/Button"


export default function Home() {
  const { signIn } = useContext(AuthContext)

  const handleLogin = async (event: FormEvent) =>{
    event.preventDefault()

    let data = {
      email: "teste@teste.com",
      password:"123123"
    }

    await signIn(data)

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
            <Input placeholder="Digite seu email" type="text" />

            <Input placeholder="Sua Senha" type="password" />

            <Button type="submit" loading={false}>Acessar</Button>
          </form>
          <Link className={styles.text} href="/signup">
            Não possui uma conta? Cadastre-se
          </Link>
        </div>
      </div>
    </>
  )
}
