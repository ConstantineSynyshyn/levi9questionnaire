import React from "react";

import Container from "@material-ui/core/Container";

// import { questionsWithOptionsData } from "../../__mocks__/questionsMock";

import type { Page } from "../types/page";

import QuestionContainer from "../components/QuestionContainer";
import { loadQuizQuestions } from "../db/entities/Question";

const QuizPage: Page = ({ data }) => {
  return <QuestionContainer questionsData={data} />;
};

QuizPage.getLayout = (page) => (
  <Container maxWidth="md" disableGutters>
    {page}
  </Container>
);

export const getServerSideProps = async () => {
  const questions = await loadQuizQuestions();
  return {
    props: {
      data: JSON.parse(JSON.stringify(questions)),
    },
  };
}

export default QuizPage;
