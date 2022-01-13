import { ButtonHTMLAttributes } from 'react'
import styles from './styles.module.scss'

interface SimpleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
}

export function SimpleButton({ title, ...rest }: SimpleButtonProps) {
  return (
    <button className={styles.container} {...rest}>
      {title}
    </button>
  )
}