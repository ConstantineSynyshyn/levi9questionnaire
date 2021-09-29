import React from "react"
import { useRouter } from "next/router"
import { GetServerSideProps } from "next"

import Container from "@material-ui/core/Container"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

import { Page } from "../types/page"
import { ROUTES } from "@constants/routes"
import { getUserByEmail } from "@db/entities/User"

const CongratulationPage: Page = () => {
  const router = useRouter()
  const homeButtonClickHandler = () => router.push(ROUTES.INDEX)
  return (
    <Box component="div" p={2}>
      <Typography variant="h1" color="textPrimary" gutterBottom>
        Congratulations, you have finished the test.
      </Typography>
      <Typography variant="h4" color="textPrimary" gutterBottom>
        We will reach to you when we process your answers.
      </Typography>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={4}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={homeButtonClickHandler}
          >
            Go home
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const currentUser = await getUserByEmail("")
  const isQuizCompleted = Boolean(currentUser?.quizEndTime)
  if (!isQuizCompleted) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

CongratulationPage.getLayout = (page) => (
  <Container maxWidth="md" disableGutters>
    {page}
  </Container>
)

CongratulationPage.requireAuth = true

export default CongratulationPage
