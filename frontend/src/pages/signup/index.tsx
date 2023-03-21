import Head from "next/head"
import Image from "next/image"
import styles from '../../styles/home.module.scss'
import logoImg from '../../../public/logo.svg'

import Link from "next/link"
import Button from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"

export default function Signup() {
  return (
    <>
      <Head>
        <title>Faça seu cadastro agora!</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} className={styles.logo} alt="Logo Corleone Pizza" />

        <div className={styles.login}>
          <h1>Criando sua conta</h1>
          <form>
            <Input placeholder="Digite seu nome" type="text" />

            <Input placeholder="Digite seu email" type="text" />

            <Input placeholder="Sua Senha" type="password" />

            <Button type="submit" loading={false}>Cadastrar</Button>
          </form>
          <Link className={styles.text} href="/">
            Já possui uma conta? Faça login
          </Link>
        </div>
      </div>
    </>
  )
}
