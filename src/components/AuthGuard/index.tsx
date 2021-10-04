import { ROUTES } from "@constants/routes"
import { useSession } from "next-auth/client"
import router from "next/router"
import React from "react"
import { Box, Container, CircularProgress } from "@material-ui/core"

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
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <CircularProgress />
      </Box>
    </Container>
  )
}

export default AuthGuard
