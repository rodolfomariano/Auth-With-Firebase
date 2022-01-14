import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import Router from 'next/router'
import Firebase from '../lib/firebase'

interface User {
  displayName: string
  email: string
  photoURL: string
  provider?: string
}

interface AuthProviderProps {
  children: ReactNode
}

interface AuthContextData {
  user: User
  loading: boolean
  setLoading: (value: boolean) => void
  signInWithGitHub: () => void
  signInWithGoogle: () => void
  createUserWithEmailAndPassword: (name: string, email: string, password: string) => void
  signInWithEmail: (email: string, password: string) => void
  recoverPassword: (email: string) => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User)
  const [loading, setLoading] = useState(false)

  function signInWithGoogle() {
    try {
      setLoading(true)

      const signIn = Firebase.auth().signInWithPopup(new Firebase.auth.GoogleAuthProvider).then((response) => {

        if (response.user) {
          // setProvider(response.user!.providerData[0]!.providerId)

          const { displayName, email, photoURL } = response.user as User

          setUser({
            displayName,
            email,
            photoURL,
            provider: response.user!.providerData[0]!.providerId
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

        if (response.user) {
          // setProvider(response.user!.providerData[0]!.providerId)

          const { displayName, email, photoURL } = response.user as User

          setUser({
            displayName,
            email,
            photoURL,
            provider: response.user!.providerData[0]!.providerId
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

  function createUserWithEmailAndPassword(name: string, email: string, password: string) {
    setLoading(true)
    Firebase.auth().createUserWithEmailAndPassword(email, password).then((response) => {

      setUser({
        displayName: name,
        email: email,
        photoURL: ''
      })

    }).catch((error) => {
      setLoading(false)
      console.log(error)
    }).finally(() => {

      const editUser = Firebase.auth().currentUser

      editUser?.updateProfile({
        displayName: name,
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/auth-text-rms.appspot.com/o/user.png?alt=media&token=996ca0f8-519c-486c-853e-1bf7147305ad'
      }).then(() => {
        localStorage.setItem('user_auth', JSON.stringify(user))
        setLoading(false)
        Router.push('/')

      }).catch(error => {
        setLoading(false)
        console.log(error)
      })

    })
  }

  function signInWithEmail(email: string, password: string) {
    try {
      setLoading(true)

      const signIn = Firebase.auth().signInWithEmailAndPassword(email, password).then(response => {

        if (response.user) {
          // setProvider(response.user!.providerData[0]!.providerId)

          const { displayName, email, photoURL } = response.user as User

          setUser({
            displayName,
            email,
            photoURL,
            provider: response.user!.providerData[0]!.providerId
          })

          setTimeout(() => {
            Router.push('/app/dashboard')

          }, 3000)

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

  function recoverPassword(email: string) {

    Firebase.auth().sendPasswordResetEmail(email).then(() => {

    }).catch(error => {
      console.log(error)
    })
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
    <AuthContext.Provider value={{
      user,
      loading,
      setLoading,
      signInWithGitHub,
      signInWithGoogle,
      createUserWithEmailAndPassword,
      signInWithEmail,
      recoverPassword,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useFirebaseAuth() {
  const context = useContext(AuthContext)

  return context
}