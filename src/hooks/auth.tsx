import { createContext, ReactNode, useContext, useState } from 'react'
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
  signOut: () => void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User)
  const [loading, setLoading] = useState(true)

  function signInWithGitHub() {
    try {
      setLoading(true)

      const signIn = Firebase.auth().signInWithPopup(new Firebase.auth.GithubAuthProvider()).then((response) => {
        console.log(response.user)

        const { displayName, email, photoURL } = response.user as User

        setUser({
          displayName,
          email,
          photoURL
        })
        Router.push('/app/dashboard')

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

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGitHub, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useFirebaseAuth() {
  const context = useContext(AuthContext)

  return context
}