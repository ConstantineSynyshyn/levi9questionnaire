import React from "react"

import { questionData } from "../../__mocks__/questionsMock"

import type { Page } from "../types/page"

import QuestionContainer from "../components/QuestionContainer"
import Container from "@material-ui/core/Container"
import { DEFAULT_OPEN_QUESTION_TIME_TO_RESPOND } from "@constants/configuration"
import useOnWindowLeave from "../hooks/useOnWindowLeave"

const OpenQuestionPage: Page = () => {
  useOnWindowLeave()
  return (
    <QuestionContainer
      questionsData={questionData}
      timeForResponse={DEFAULT_OPEN_QUESTION_TIME_TO_RESPOND}
    />
  )
}

OpenQuestionPage.getLayout = (page) => (
  <Container maxWidth="md" disableGutters>
    {page}
  </Container>
)

OpenQuestionPage.requireAuth = true
export default OpenQuestionPage
