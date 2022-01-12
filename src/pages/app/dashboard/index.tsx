import { useFirebaseAuth } from "../../../hooks/auth"

interface UserData {
  name: string
  email: string
  photoURL: string
}

export default function dashboard() {
  const { user } = useFirebaseAuth()

  return (
    <h1>Dashboard: {user.displayName}</h1>
  )
}