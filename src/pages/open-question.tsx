import React from "react";

import { questionData } from "../../__mocks__/questionsMock";

import type { Page } from "../types/page";

import QuestionContainer from "../components/QuestionContainer";
import Container from "@material-ui/core/Container";
import useOnWindowLeave from "../hooks/useOnWindowLeave";

const OpenQuestionPage: Page = () => {
  useOnWindowLeave();
  return (
    <QuestionContainer questionsData={questionData} timeForResponse={180} />
  );
};

OpenQuestionPage.getLayout = (page) => (
  <Container maxWidth="md" disableGutters>
    {page}
  </Container>
);

export default OpenQuestionPage;
