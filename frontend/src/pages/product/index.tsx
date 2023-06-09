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

type ItemProps = {
  id: string
  name: string
}

interface CategoryProps {
  categoryList: ItemProps[]
}

export default function Product({ categoryList }: CategoryProps) {
  const [avatarURL, setAvatarURL] = useState('')
  const [imageAvatar, setImageAvatar] = useState(null)

  const [categories, setCategories] = useState(categoryList || [])
  const [selectedCategory, setSelectedCategory] = useState('')


  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')


  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {

    if (!event.target.files) {
      return
    }

    const image = event.target.files[0]

    if (!image) {
      return
    }
    if (image.type === 'image/jpeg' || image.type === 'image/png') {
      setImageAvatar(image)
      setAvatarURL(URL.createObjectURL(image))
    }

  }
  // Quando você seleciona uma nova categoria na lista
  const handleChangeCategory = (event) => {
    // console.log('Categoria Selecionada: ', categories[event.target.value])
    setSelectedCategory(event.target.value)
  }

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault()

    try {
      const data = new FormData()

      if (name === '' || price === '' || description === '' || imageAvatar === 'null') {
        toast.error('Preencha todos os campos!')
        return
      }
      data.append('name', name)
      data.append('price', price)
      data.append('description', description)
      data.append('category_id', categories[selectedCategory].id)
      data.append('file', imageAvatar)

      const apiClient = setupAPIClient()
      await apiClient.post("/product", data)

      toast.success("Produto cadastrado com sucesso!")

    } catch (error) {
      console.log(error)
      toast.error("Ops, erro ao cadastrar o produto")

    }
    
    setName('')
    setPrice('')
    setDescription('')
    setImageAvatar(null)
    setAvatarURL('')

  }
  return (
    <>
      <Head>
        <title>Novo Produto - Corleone Pizza</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <h1 className={styles.name}>Novo produto</h1>

          <form onSubmit={handleRegister} className={styles.form}>

            <label className={styles.labelAvatar}>
              <span><FiUpload size={30} color="#FFF" /></span>
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFile}
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

            <select onChange={handleChangeCategory} value={selectedCategory} >
              {categories.map((category, index) => (
                <option key={category.id} value={index}>
                  {category.name}
                </option>
              ))}
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
              value={description}
              onChange={(event) => setDescription(event.target.value)}
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
  const apiClient = setupAPIClient(ctx)

  const response = await apiClient.get("/category")
  console.log(response.data)

  return {
    props: {
      categoryList: response.data
    }
  }
})
