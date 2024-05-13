import { doc, getDoc, setDoc } from 'firebase/firestore';
import { FormEvent, useEffect, useState } from 'react';

import Header from '../../components/Header';
import Input from '../../components/Input';
import { db } from '../../services/firebaseConnection';

const Networks = () => {
  const [facebook, setFacebook] = useState('')
  const [instagram, setInstagram] = useState('')
  const [youtube, setYoutube] = useState('')

  useEffect(() => {
    const loadLinks = () => {
      const docRef = doc(db, 'social', 'link')

      getDoc(docRef)
      .then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setFacebook(snapshot.data()?.facebook)
          setInstagram(snapshot.data()?.instagram)
          setYoutube(snapshot.data()?.youtube)
        }
      })
    }

    loadLinks()
  }, [])

  const handleRegister = (e: FormEvent) => {
    e.preventDefault()

    if (facebook === '' || instagram === '' || youtube === '') {
      alert('Preencha preencha pelo menos um dos campos!')
      return
    }

    setDoc(doc(db, 'social', 'link'), {
      facebook: facebook,
      instagram: instagram,
      youtube: youtube
    })
    .then(() => {
      console.log('CADASTRADO COM SUCESSO!')
    })
    .catch((error) => {
      console.log('ERRO AO CADASTRAR NO BANCO' + error)
    })
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />

      <h1 className='text-white text-2xl font-medium mt-8 mb-4'>Minhas redes sociais</h1>

      <form className='flex flex-col max-w-xl w-full' onSubmit={handleRegister}>
        <label className='text-white font-medium mt-2 mb-3'>Link do Facebook</label>
        <Input 
          type="url"
          placeholder='Digite a URL do Facebook...'
          value={facebook}
          onChange={ (e) => setFacebook(e.target.value) }
        />

        <label className='text-white font-medium mt-2 mb-3'>Link do Instagram</label>
        <Input 
          type="url"
          placeholder='Digite a URL do Instagram...'
          value={instagram}
          onChange={ (e) => setInstagram(e.target.value) }
        />

        <label className='text-white font-medium mt-2 mb-3'>Link do Youtube</label>
        <Input 
          type="url"
          placeholder='Digite a URL do Youtube...'
          value={youtube}
          onChange={ (e) => setYoutube(e.target.value) }
        />

        <button 
          type='submit' 
          className='mb-7 bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center'
        >
          Salvar links
        </button>
      </form>
    </div>
  )
}

export default Networks