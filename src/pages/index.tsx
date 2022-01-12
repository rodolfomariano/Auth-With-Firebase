import type { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'

import { InputLogin } from '../components/InputLogin'
import { SimpleButton } from '../components/SimpleButton'
import { SocialButtonLogin } from '../components/SocialButtonLogin'
import { useFirebaseAuth } from '../hooks/auth'

import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  // @ts-ignore
  const { user, loading, signInWithGitHub, signInWithGoogle } = useFirebaseAuth()

  console.log(user)

  return (
    <>
      <div className={styles.card_container}>
        <main className={styles.card_login}>
          <h1 className={styles.title}>Login</h1>

          <div className={styles.social_button_container}>
            <SocialButtonLogin
              type='google'
              title='Entrar com Google'
              onClick={() => signInWithGoogle()}
            />

            <SocialButtonLogin
              type='github'
              title='Entrar com GitHub'
              onClick={() => signInWithGitHub()}
            />
          </div>

          <div className={styles.separator}>
            <hr />
            <span>ou</span>
          </div>

          <form action="">
            <InputLogin type='email' placeholder='Digite seu email' />
            <InputLogin type='password' placeholder='Digite sua senha' />

            <SimpleButton title='Entrar' />
          </form>

          <span
            className={styles.forgot_password}
            onClick={() => setModalIsOpen(true)}
          >
            Esqueci a senha
          </span>

          <Link href="/SignUp">
            <a className={styles.signUp_button}>
              Criar uma conta
            </a>
          </Link>

        </main>

      </div>

      {/* Modal */}
      <div className={!modalIsOpen ? `${styles.modal_container} ${styles.close_modal}` : `${styles.modal_container} ${styles.open_modal}`}>
        <div className={styles.content}>
          <header className={styles.modal_header}>
            <button
              className={styles.close_modal_btn}
              onClick={() => setModalIsOpen(false)}
            >
              X
            </button>
            <h3 className={styles.modal_title}>
              Recuperar senha
            </h3>
          </header>

          <InputLogin type='email' placeholder='Digite seu email' />

          <footer className={styles.modal_footer}>
            <button
              className={styles.cancel}
              onClick={() => setModalIsOpen(false)}
            >
              Cancelar
            </button>
            <button className={styles.send}>Enviar</button>
          </footer>
        </div>
        <div
          className={styles.modal_bg}
          onClick={() => setModalIsOpen(false)}
        />
      </div>
    </>
  )
}

export default Home