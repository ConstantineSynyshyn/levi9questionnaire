import { ROUTES } from "@constants/routes"
import { useSession } from "next-auth/client"
import router from "next/router"
import React from "react"

import CircularProgress from "@material-ui/core/CircularProgress"
import Container from "@material-ui/core/Container"
import Box from "@material-ui/core/Box"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "480px",
  },
})
const AuthGuard: React.FC = ({ children }) => {
  const [session, loading] = useSession()
  const classes = useStyles()
  const isUser = !!session?.user
  React.useEffect(() => {
    if (loading) return
    if (!isUser) {
      router.replace(ROUTES.AUTH)
    }
  }, [isUser, loading])

  if (isUser) {
    return <>{children}</>
  }

  return (
    <Container maxWidth="md">
      <Box className={classes.container}>
        <CircularProgress disableShrink />
      </Box>
    </Container>
  )
}

export default AuthGuard
