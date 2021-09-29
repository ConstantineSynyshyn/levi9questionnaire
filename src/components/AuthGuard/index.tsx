import { ROUTES } from "@constants/routes"
import { useSession, signIn } from "next-auth/client"
import router from "next/router"
import React from "react"

import CircularProgress from "@material-ui/core/CircularProgress"
import Container from "@material-ui/core/Container"

const AuthGuard: React.FC = ({ children }) => {
  const [session, loading] = useSession()
  const isUser = !!session?.user
  React.useEffect(() => {
    if (loading) return
    if (!isUser) {
      router.replace(ROUTES.AUTH)
    }
  }, [isUser, loading])

  if (isUser) {
    return (<>{children}</>)
  }

  return (
    <Container maxWidth="md" disableGutters>
      <CircularProgress />
    </Container>
  )
}

export default AuthGuard
