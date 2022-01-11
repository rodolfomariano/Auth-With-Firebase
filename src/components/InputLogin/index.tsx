import styles from './styles.module.scss'

import { AiOutlineMail, AiOutlineLock, AiOutlineEyeInvisible, AiOutlineEye, AiOutlineUser } from 'react-icons/ai'
import { useState } from 'react'

interface InputLoginProps {
  type: 'email' | 'password' | 'user'
  placeholder?: string
}

export function InputLogin({ type, placeholder }: InputLoginProps) {
  const [isHidden, setIsHidden] = useState(true)

  return (
    type === 'email'
      ? (
        <div className={styles.container}>
          <AiOutlineMail className={styles.icon} />
          <input
            className={styles.input}
            type="email"
            placeholder={placeholder}
            required
          />
        </div>
      )
      : type === 'user'
        ? (
          <div className={styles.container}>
            <AiOutlineUser className={styles.icon} />
            <input
              className={styles.input}
              type="text"
              placeholder={placeholder}
              required
            />
          </div>
        )
        : (
          <div className={styles.container}>
            <AiOutlineLock className={styles.icon} />
            <input
              className={styles.input}
              type={isHidden ? 'password' : 'text'}
              placeholder={placeholder}
              required
            />
            {isHidden
              ? <AiOutlineEyeInvisible className={styles.icon_right} onClick={() => setIsHidden(false)} />
              : <AiOutlineEye className={styles.icon_right} onClick={() => setIsHidden(true)} />
            }

          </div>
        )


  )
}