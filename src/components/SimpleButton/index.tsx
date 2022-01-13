import { ButtonHTMLAttributes } from 'react'
import { useFirebaseAuth } from '../../hooks/auth'
import styles from './styles.module.scss'

interface SimpleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
}

export function SimpleButton({ title, ...rest }: SimpleButtonProps) {
  const { loading, setLoading } = useFirebaseAuth()



  return (
    <button
      className={styles.container} {...rest}
    >
      {loading
        ? 'Carregando...'
        : title
      }

    </button>
  )
}