import React from "react";

import { questionsData } from "../../__mocks__/questionsMock";

import type { Page } from "../types/page";

import Quiz from "../components/Quiz";

const QuizPage: Page = () => {
  return <Quiz questionsData={questionsData} />;
};

export default QuizPage;
