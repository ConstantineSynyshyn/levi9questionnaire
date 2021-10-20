import React from "react"

import Container from "@material-ui/core/Container"

import UserOverview from "@components/Admin/User/UserOverview"
import { UsersOverviewType } from "@components/Admin/User/types"
import { getCollectionSize, getUserList } from "@db/entities/User"
import { Page } from "../../../types/page"
import { NextApiRequest } from "next"
import { User } from "@db/entities/User/types"
import { getTimeLeftString, getTimeObject } from "@utils/index"

const SORTABLE_FIELDS: { [key: string]: string } = {
  email: "email",
  score: "quizScore",
  quizTime: "quizTime",
  quizStartTime: "quizStartTime",
  quizEndTime: "quizEndTime",
}

const ROW_PER_PAGE = 30

interface Props {
  users: UsersOverviewType
  count: number
  rowPerPage: number
}

const QuizPage: Page<Props> = (props) => {
  return <UserOverview {...props} />
}

QuizPage.getLayout = (page) => (
  <Container maxWidth="md" disableGutters>
    {page}
  </Container>
)

export const getServerSideProps = async (req: NextApiRequest) => {
  const { order, dir, page } = req.query
  const sortBy: string = order as string
  const orderByField: string | undefined = SORTABLE_FIELDS[sortBy] || undefined
  const currentPage =
    page && parseInt(page as string) ? parseInt(page as string) : 1
  const offset = currentPage <= 1 ? 0 : (currentPage - 1) * ROW_PER_PAGE - 1
  const users = await getUserList(
    orderByField,
    dir as string,
    ROW_PER_PAGE,
    offset
  )
  const userList = (users || []).reduce(
    (list: UsersOverviewType, item: User) => {
      const {
        email = "",
        quizStartTime = 0,
        quizEndTime = 0,
        isConfirmed = false,
        quizScore: score = 0,
        quizTime = 0,
      } = item
      const quizTimeString = getTimeLeftString(getTimeObject(quizTime))
      return [
        ...list,
        {
          email,
          quizStartTime,
          quizEndTime,
          isConfirmed,
          score,
          quizTime: quizTimeString,
        },
      ]
    },
    []
  )
  const count = await getCollectionSize()
  return {
    props: { count, users: userList, rowPerPage: ROW_PER_PAGE },
  }
}

QuizPage.requireAuth = true
QuizPage.isAdminPage = true

export default QuizPage
