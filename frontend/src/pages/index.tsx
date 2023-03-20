import Head from "next/head"
import Image from "next/image"
import styles from '../styles/home.module.scss'
import logoImg from '../../public/logo.png'

import { Input } from "../components/ui/input"

export default function Home() {
  return (
    <>
      <Head>
        <title> Corleone Pizza - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg}  className={styles.logo}  alt="Logo Corleone Pizza" />

        <div className={styles.login}>
          <form>
            <Input placeholder="Digite seu email" type="text"/>
            <Input placeholder="Sua Senha" type="password" />
          </form>
        </div>
      </div>
    </>
  )
}
