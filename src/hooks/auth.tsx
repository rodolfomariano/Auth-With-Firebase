import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import Router from 'next/router'
import Firebase from '../lib/firebase'

interface User {
  displayName: string
  email: string
  photoURL: string
}

interface AuthProviderProps {
  children: ReactNode
}

interface AuthContextData {
  user: User
  loading: boolean
  signInWithGitHub: () => void
  signInWithGoogle: () => void
  signOut: () => void
  provider: string
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User)
  const [loading, setLoading] = useState(true)
  const [provider, setProvider] = useState('')

  function signInWithGoogle() {
    try {
      setLoading(true)

      const signIn = Firebase.auth().signInWithPopup(new Firebase.auth.GoogleAuthProvider).then((response) => {
        console.log(response.user)

        if (response.user) {
          setProvider(response.user!.providerData[0]!.providerId)

          const { displayName, email, photoURL } = response.user as User

          setUser({
            displayName,
            email,
            photoURL
          })

          Router.push('/app/dashboard')
        }

      })

      return signIn

    } catch (error) {
      setLoading(false)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  function signInWithGitHub() {
    try {
      setLoading(true)

      const signIn = Firebase.auth().signInWithPopup(new Firebase.auth.GithubAuthProvider()).then((response) => {
        console.log(response.user)

        if (response.user) {
          setProvider(response.user!.providerData[0]!.providerId)

          const { displayName, email, photoURL } = response.user as User

          setUser({
            displayName,
            email,
            photoURL
          })

          Router.push('/app/dashboard')
        }

      })

      return signIn

    } catch (error) {
      setLoading(false)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  function signOut() {
    try {
      localStorage.setItem('user_auth', '')
      Router.push('/')

      return Firebase.auth().signOut().then(() =>
        console.log(user)
      )

    } catch (error) {
      setLoading(false)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    user.email && localStorage.setItem('user_auth', JSON.stringify(user))

  }, [user])

  return (
    <AuthContext.Provider value={{ user, loading, provider, signInWithGitHub, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useFirebaseAuth() {
  const context = useContext(AuthContext)

  return context
}