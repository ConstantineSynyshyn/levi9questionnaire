import React from "react";

import Container from "@material-ui/core/Container";

import { questionsWithOptionsData } from "../../__mocks__/questionsMock";

import type { Page } from "../types/page";

import QuestionContainer from "../components/QuestionContainer";
import useOnWindowLeave from "../hooks/useOnWindowLeave";

const QuizPage: Page = () => {
  useOnWindowLeave();
  return <QuestionContainer questionsData={questionsWithOptionsData} />;
};

QuizPage.getLayout = (page) => (
  <Container maxWidth="md" disableGutters>
    {page}
  </Container>
);

export default QuizPage;
