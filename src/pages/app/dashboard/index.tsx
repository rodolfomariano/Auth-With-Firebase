import Router from "next/router"
import { useEffect, useState } from "react"
import { useFirebaseAuth } from "../../../hooks/auth"

interface UserData {
  displayName: string
  email: string
  photoURL: string
  provider?: string
}

export default function Dashboard() {
  const { user, signOut } = useFirebaseAuth()
  const [userLogged, setUserLogged] = useState<UserData>(user)


  useEffect(() => {
    let getUser = localStorage.getItem('user_auth')

    if (getUser) {
      let getUserObject = JSON.parse(getUser)
      setUserLogged(getUserObject)

    } else {
      Router.push('/')
    }

  }, [])


  return (
    <h1>Dashboard: {userLogged.displayName}
      <button onClick={signOut}>Sair</button>
      <h2>
        Logado com: {userLogged.provider}
      </h2>
    </h1>
  )
}