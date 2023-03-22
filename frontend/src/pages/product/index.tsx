import Head from 'next/head'
import { useState } from 'react'
import { Header } from '../../components/Header'
import styles from './styles.module.scss'
import { FormEvent } from 'react'
import { setupAPIClient } from '../../services/api'
import { toast } from 'react-toastify'
import { canSSRAuth } from '../../utils/canSSRAuth'
import { FiUpload } from 'react-icons/fi'
import Image from 'next/image'

export default function Product() {
  const [avatarURL, setAvatarURL] = useState('')
  const [imageAvatar, setImageAvatar] = useState(null)
  const [banner, setBanner] = useState(null)
  const [category, setCategory] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')


  const handleFile = (event:React.ChangeEvent<HTMLInputElement>)=>{
    
    if(!event.target.files){
      return
    }

    const image = event.target.files[0]

    if(!image){
      return
    }
    if (image.type === 'image/jpeg' || image.type === 'image/png' ){
      setImageAvatar(image)
      setAvatarURL(URL.createObjectURL(image))
    }
    
  }

  const handleRegister = (event: FormEvent) => {
    if (banner === null || category === '' || name === '' || price === '' || description === '') {
      return
    }
    const apiClient = setupAPIClient()
    // await apiClient.post("/product",{
    //   banner: banner,
    //   name: name,
    //   price: price,
    //   description: description,

    // })
  }
  return (
    <>
      <Head>
        <title>Novo Produto - Corleone Pizza</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <h1 className={styles.name}>Página novo produto</h1>

          <form className={styles.form}>

            <label className={styles.labelAvatar}>
              <span><FiUpload size={30} color="#FFF" /></span>
              <input
                value={banner}
                accept="image/png, image/jpeg"
                onChange={handleFile} type="file"
              />
              {avatarURL && (
                <Image
                className={styles.preview}
                src={avatarURL}
                alt="Foto do produto"
                width={250}
                height={250} />
              )}


            </label>


            <select>
              <option>Pizzas</option>
              <option>Bebidas</option>
            </select>
            <input value={name}
              onChange={(event) => setName(event.target.value)} type="text"
              placeholder='Nome do item'
              className={styles.input}
            />

            <input
              value={price}
              onChange={(event) => setPrice(event.target.value)} type="number"
              placeholder='Valor'
              className={styles.input}
            />

            <textarea
              placeholder='Descreva seu produto'
              className={styles.input}
            />

            <button className={styles.buttonAdd} type="submit">Cadastrar</button>

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
