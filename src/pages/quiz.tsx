import React from "react"
import { GetServerSideProps } from 'next'
import { getSession } from "next-auth/client";
import Container from "@material-ui/core/Container"

import QuestionContainer from "@components/QuestionContainer/QuestionContainer"
import initializeQuiz, {
  getQuizQuestionInfo,
} from "@services/QuestionManager/manageQuiz"
import { Page, QuizQuestionInfoType } from "../types"

interface Props extends QuizQuestionInfoType {}

const QuizPage: Page<Props> = (props) => {
  return <QuestionContainer {...props} />
}

QuizPage.getLayout = (page) => (
  <Container maxWidth="md" disableGutters>
    {page}
  </Container>
)

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  const email = session?.user?.email;
  // @TODO in case quiz finalized redirect to home page
  await initializeQuiz(email!)
  const quizQuestionInfo = await getQuizQuestionInfo(email!)
  // @TODO in case (startedAt + total * timePerQuestion) < Date.now() we should finalize quiz and go to thank you page
  return {
    props: {
      ...quizQuestionInfo,
      isTimerVisible: false,
    },
  }
}

QuizPage.requireAuth = true

export default QuizPage
