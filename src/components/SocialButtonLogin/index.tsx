import styles from './styles.module.scss'

import { FaGoogle, FaGithub } from 'react-icons/fa'

interface SocialButtonLoginProps {
  type: 'google' | 'github'
  title: string
}

export function SocialButtonLogin({ type, title }: SocialButtonLoginProps) {
  return (
    <button className={styles.container}>
      {type === 'google' ? <FaGoogle className={styles.icon} /> : <FaGithub className={styles.icon} />}

      <span className={styles.title}>
        {title}
      </span>

    </button>
  )
}