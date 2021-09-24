import React from "react"
import { GetServerSideProps } from "next"
import Router from "next/router"
import { useSession } from "next-auth/client"
import Container from "@material-ui/core/Container"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { getSession } from "next-auth/client"

import type { Page } from "../types/page"
import { ROUTES } from "@constants/routes"
import {
  DEFAULT_OPEN_QUESTION_TIME_TO_RESPOND,
  DEFAULT_TIME_TO_RESPOND,
} from "@constants/configuration"
import { getUserByEmail } from "@db/entities/User"
import { withPageAuthRequired } from "@utils/withPageAuthRequired"

interface Props {
  isQuizStarted: boolean
  isQuizEnded: boolean
}

const IndexPage: Page<Props> = (props) => {
  const { isQuizStarted, isQuizEnded = false } = props
  const [session] = useSession()
  console.log(session)
  const quizInfoBlock = React.useMemo(() => {
    if (isQuizEnded) {
      return (
        <Box display="flex" justifyContent="center" component="div" m={2}>
          <Typography variant="h5" color="textPrimary" gutterBottom>
            Quiz is already ended
          </Typography>
        </Box>
      )
    }
    if (isQuizStarted) {
      return (
        <Box display="flex" justifyContent="center" component="div" m={2}>
          <Typography variant="h5" color="textPrimary" gutterBottom>
            Quiz is already started
          </Typography>
        </Box>
      )
    }
    return (
      <Box display="flex" justifyContent="center" component="div" m={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            Router.push(ROUTES.QUIZ)
          }}
        >
          Start
        </Button>
      </Box>
    )
  }, [isQuizStarted, isQuizEnded])
  return (
    <Box component="div" p={2}>
      <Typography variant="h3" color="textPrimary" gutterBottom>
        Welcome {session?.user?.name}!
      </Typography>
      <Typography variant="body1" color="textPrimary" gutterBottom>
        You have only one attempt.
      </Typography>
      <Typography variant="body1" color="textPrimary" gutterBottom>
        Stage one: quiz questions with {DEFAULT_TIME_TO_RESPOND} seconds time
        limit for each.
      </Typography>
      <Typography variant="body1" color="textPrimary" gutterBottom>
        Stage two: practical questions with{" "}
        {DEFAULT_OPEN_QUESTION_TIME_TO_RESPOND} seconds time limit for each.
      </Typography>
      <Typography variant="body1" color="textPrimary" gutterBottom>
        Stage three: English language quiz.
      </Typography>
      <Typography variant="body1" color="textPrimary" gutterBottom>
        Click start when you are ready. Have fun! &#128293;
      </Typography>
      {quizInfoBlock}
    </Box>
  )
}
export const getServerSideProps: GetServerSideProps = withPageAuthRequired(
  async (context) => {
    const currentUser = await getUserByEmail("")
    return {
      props: {
        isQuizStarted:
          Boolean(currentUser?.quizStartTime) &&
          Boolean(currentUser?.initialQuestions),
        isQuizEnded: Boolean(currentUser?.quizEndTime),
      },
    }
  }
)

IndexPage.getLayout = (page) => (
  <Container maxWidth="md" disableGutters>
    {page}
  </Container>
)

export default IndexPage
