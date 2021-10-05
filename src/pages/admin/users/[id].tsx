import React from "react"
import { NextApiRequest } from "next"

import Container from "@material-ui/core/Container"

import UserDetails, {
  Props as UserDetailsProps,
} from "@components/Admin/User/UserDetails"
import { getUserByEmail } from "@db/entities/User"
import { getQuizAnalise } from "@services/QuestionManager/analizeQuiz"
import { Page } from "../../../types/page"

interface Props extends UserDetailsProps {}

const QuizPage: Page<Props> = (props) => {
  return <UserDetails {...props} />
}

QuizPage.getLayout = (page) => (
  <Container maxWidth="md" disableGutters>
    {page}
  </Container>
)

export const getServerSideProps = async (req: NextApiRequest) => {
  const { id: email } = req.query
  const user = await getUserByEmail(email as string)

  let quizResult = null
  if (user) {
    quizResult = getQuizAnalise(user.initialQuestions, user.userAnswers)
  }
  return {
    props: { user, quizResult },
  }
}

QuizPage.requireAuth = true
QuizPage.isAdminPage = true

export default QuizPage
