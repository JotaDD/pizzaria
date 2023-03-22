import Head from 'next/head'
import { useState } from 'react'
import { Header } from '../../components/Header'
import styles from './styles.module.scss'
import { FormEvent } from 'react'
import { setupAPIClient } from '../../services/api'
import { toast } from 'react-toastify'
import { canSSRAuth } from '../../utils/canSSRAuth'

export default function Category() {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  async function handleRegister(event: FormEvent) {
    event.preventDefault()
    if (name === '') {
      return
    }
    const apiClient = setupAPIClient()
    await apiClient.post("/category", {
      name: name
    })

    toast.success("Categoria cadastrada com sucesso!")
    setName('')
  }
  return (
    <>
      <Head>
        <title>Nova categoria - Corleone Pizza</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <h1>Cadastrar Categorias</h1>

          <form onSubmit={handleRegister} className={styles.form} >
            <input type="text"
              value={name}
              onChange={handleName}
              placeholder='Digite o nome da categoria'
              className={styles.input}
            />

            <button className={styles.buttonAdd} type="submit">
              Cadastrar
            </button>

          </form>
        </main>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})
