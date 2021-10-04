import React from "react"

import { getSession } from "next-auth/client"
import { Page } from "../types/page"
import { useRouter } from "next/router"
import { Container, makeStyles } from "@material-ui/core"

import AuthForm from "../components/AuthForm"
import Skeleton from "@material-ui/lab/Skeleton"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  circle: {
    margin: "0 auto",
  },
}))

const AuthPage: Page = () => {
  const [isLoading, setIsLoading] = React.useState(true)
  const router = useRouter()
  const classes = useStyles()

  React.useEffect(() => {
    ;(async function tryLogin() {
      const session = await getSession()
      if (session) {
        router.replace("/")
      } else {
        setIsLoading(false)
      }
    })()
  }, [router])

  if (isLoading) {
    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Skeleton
            className={classes.circle}
            variant="circle"
            width={40}
            height={40}
          />{" "}
          <Skeleton animation="wave" width={480} height={480} />
        </div>
      </Container>
    )
  }

  return <AuthForm />
}

AuthPage.getLayout = (page) => (
  <Container maxWidth="md" disableGutters>
    {page}
  </Container>
)

export default AuthPage
