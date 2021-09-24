import React from "react"

import Container from "@material-ui/core/Container"

import QuestionContainer from "@components/QuestionContainer/QuestionContainer"
import initializeQuiz, {
  getQuizQuestionInfo,
} from "@services/QuestionManager/manageQuiz"
import { Page } from "@types/page"
import { QuizQuestionInfoType } from "@types/question"

interface Props extends QuizQuestionInfoType {}

const QuizPage: Page<Props> = (props) => {
  return <QuestionContainer {...props} />
}

QuizPage.getLayout = (page) => (
  <Container maxWidth="md" disableGutters>
    {page}
  </Container>
)

export const getServerSideProps = async () => {
  // @TODO in case quiz finalized redirect to home page
  await initializeQuiz()
  const quizQuestionInfo = await getQuizQuestionInfo()
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
