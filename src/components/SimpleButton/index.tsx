import styles from './styles.module.scss'

interface SimpleButtonProps {
  title: string
}

export function SimpleButton({ title }: SimpleButtonProps) {
  return (
    <button className={styles.container}>
      {title}
    </button>
  )
}