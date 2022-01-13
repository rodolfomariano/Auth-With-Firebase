import { createRef, FormEvent, useRef, useState } from "react";
import { Router } from "next/router";
import Link from "next/link";
import { InputLogin } from "../../components/InputLogin";
import { SimpleButton } from "../../components/SimpleButton";

import ReCAPTCHA from "react-google-recaptcha"

import styles from './styles.module.scss'
import Firebase from "../../lib/firebase";
import { useFirebaseAuth } from "../../hooks/auth";

interface User {
  displayName: string
  email: string
  photoURL: string
}

export default function SignUp() {
  const [user, setUser] = useState<User>({} as User)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [emailConfirm, setEmailConfirm] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [recaptcha, setRecaptcha] = useState('')

  const { createUserWithEmailAndPassword } = useFirebaseAuth()

  const recaptchaRef = useRef(null)

  const key = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string

  function captureRecaptcha(value: string) {
    setRecaptcha(value)
  }

  function createUser(event: FormEvent) {
    event.preventDefault()

    if (name.length === 0) {
      console.log('Digite um nome')
    } else if (name.length < 3) {
      console.log('Digite um nome valido')
    }

    if (email.length === 0) {
      console.log('Digite um email valido!')
    } else if (email !== emailConfirm) {
      console.log('Os email são diferentes!')
    }

    if (password.length === 0) {
      console.log('Digite uma senha')
    } else if (name.length < 3) {
      console.log('Digite uma senha valida')
    } else if (password !== passwordConfirm) {
      console.log('As senhas não batem!')
    }

    if (recaptcha.length === 0) {
      console.log('Por favor marque caixa não sou robo!')
    }

    createUserWithEmailAndPassword(name, email, password)

  }

  return (
    <div className={styles.card_container}>
      <main className={styles.card_login}>
        <div className={styles.return_to_login}>
          <Link href="/">
            <a >
              Voltar para o login
            </a>
          </Link>
        </div>

        <h1 className={styles.title}>Criar conta</h1>

        <form action="">
          <InputLogin
            type='user'
            placeholder='Digite seu nome'
            onChange={(event) => setName(event.target.value)}
            value={name}
          />
          <InputLogin
            type='email'
            placeholder='Digite seu email'
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
          <InputLogin
            type='email'
            placeholder='Confirme seu email'
            onChange={(event) => setEmailConfirm(event.target.value)}
            value={emailConfirm}
          />
          <InputLogin
            type='password'
            placeholder='Digite sua senha'
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
          <InputLogin
            type='password'
            placeholder='Confirme sua senha'
            onChange={(event) => setPasswordConfirm(event.target.value)}
            value={passwordConfirm}
          />

          <div className={styles.reCAPTCHA}>
            <ReCAPTCHA
              ref={recaptchaRef}
              size="normal"
              sitekey={key}
              // @ts-ignore
              onChange={(e) => captureRecaptcha(e)}
            />
          </div>

          <p className={styles.terms_of_use}>
            Ao cadastrar você concorda com os <a href="">termos de uso</a> e com a <a href="">politica de segurança</a>
          </p>

          <SimpleButton title='Criar' onClick={(event) => createUser(event)} />
        </form>


      </main>

    </div>
  )
}