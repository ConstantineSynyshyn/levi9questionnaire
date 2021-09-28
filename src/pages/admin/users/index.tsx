import React from "react"

import Container from "@material-ui/core/Container"

import UserOverview from "@components/Admin/User/UserOverview"
import {
  UserOverviewType,
  UsersOverviewType,
} from "@components/Admin/User/types"
import { getUserList } from "@db/entities/User"
import { Page } from "@types/page"

interface Props {
  users: UsersOverviewType
}

const QuizPage: Page<Props> = (props) => {
  return <UserOverview {...props} />
}

QuizPage.getLayout = (page) => (
  <Container maxWidth="md" disableGutters>
    {page}
  </Container>
)

export const getServerSideProps = async () => {
  const users = await getUserList()
  const userList = (users || []).reduce(
    (list: UsersOverviewType, item: UserOverviewType) => {
      const {
        email,
        quizStartTime = 0,
        quizEndTime = 0,
        isConfirmed = false,
      } = item
      return [...list, { email, quizStartTime, quizEndTime, isConfirmed }]
    },
    []
  )
  return {
    props: { users: userList },
  }
}

QuizPage.requireAuth = true
QuizPage.isAdminPage = true

export default QuizPage
