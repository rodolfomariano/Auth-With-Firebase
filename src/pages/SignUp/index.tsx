import { createRef, useRef } from "react";
import Link from "next/link";
import { InputLogin } from "../../components/InputLogin";
import { SimpleButton } from "../../components/SimpleButton";

import ReCAPTCHA from "react-google-recaptcha"

import styles from './styles.module.scss'

export default function SignUp() {

  const recaptchaRef = useRef(null)

  const key = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string

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
          <InputLogin type='user' placeholder='Digite seu nome' />
          <InputLogin type='email' placeholder='Digite seu email' />
          <InputLogin type='email' placeholder='Confirme seu email' />
          <InputLogin type='password' placeholder='Digite sua senha' />
          <InputLogin type='password' placeholder='Confirme sua senha' />

          <div className={styles.reCAPTCHA}>
            <ReCAPTCHA
              ref={recaptchaRef}
              size="normal"
              sitekey={key}
              onChange={() => { }}
            />
          </div>

          <p className={styles.terms_of_use}>
            Ao cadastrar você concorda com os <a href="">termos de uso</a> e com a <a href="">politica de segurança</a>
          </p>

          <SimpleButton title='Criar' />
        </form>


      </main>

    </div>
  )
}