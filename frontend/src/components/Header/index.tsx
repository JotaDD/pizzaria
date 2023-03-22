import styles from './styles.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { useContext } from 'react'
import {AuthContext}
 from '../../contexts/AuthContext'

import { FiLogOut } from 'react-icons/fi'
export function Header() {
  const {user, signOut} = useContext(AuthContext)
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/dashboard">
          <Image className={styles.image} src="./logo.svg" width={180} height={180} alt="Corleone Pizza" />
        </Link>
        <nav className={styles.menuNav}>
          <Link className={styles.category} href="/category">Categoria</Link>
          <Link className={styles.product} href="/product">Cardápio</Link>

          <button onClick={signOut}>
            <FiLogOut color="#FFF" size={24} />
          </button>
        </nav>
      </div>
    </header>
  )
}
