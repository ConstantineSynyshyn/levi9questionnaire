import React from "react"

import { Page } from "../../types/page"

import UploadQuestionContainer from "../../components/Admin/Questions/Upload"
import Container from "@material-ui/core/Container"

const UploadQuestionsPage: Page = () => {
  return <UploadQuestionContainer />
}

UploadQuestionsPage.getLayout = (page) => (
  <Container maxWidth="md" disableGutters>
    {page}
  </Container>
)

UploadQuestionsPage.requireAuth = true

export default UploadQuestionsPage
