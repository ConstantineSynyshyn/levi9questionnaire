import React, { useEffect, useState } from "react";
import Router from "next/router";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Question from "@components/Question";

import { DEFAULT_TIME_TO_RESPOND } from "@constants/configuration";
import Timer from '@components/Timer';

import {
  StyledQuestionBox,
  StyledQuestionFooter,
  StyledQuestionHeader,
  StyledTimerContainer,
  StyledQuestionContainer,
} from "./styles";

import { Props } from "./types";
import { ROUTES } from "../../constants/routes";

// @TODO have to be refactored
const QuestionContainer: React.FC<Props> = ({
  questionsData,
  timeForResponse = DEFAULT_TIME_TO_RESPOND,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isTestFinished, setIsTestFinished] = useState(false);
  const [timer, setTimer] = useState(timeForResponse);
  const [answers, setAnswers] = useState({});
  const [currentSelection, setCurrentSelection] = useState("");

  const questionsAmount = questionsData.length;

  const handleAnswerSet = (answer: string) => {
    setCurrentSelection(answer);
  };

  const handleSubmit = () => {
    setTimer(15);

    const nextQuestionIndex = currentQuestionIndex + 1;
    const answerIndex = questionsData[currentQuestionIndex].id;
    const hasNextQuestion = nextQuestionIndex < questionsAmount;

    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [answerIndex]: currentSelection,
    }));

    if (hasNextQuestion) {
      setCurrentQuestionIndex(nextQuestionIndex);
    }

    if (!hasNextQuestion) {
      setIsTestFinished(true);
    }
  };

  useEffect(() => {
    const interval = timer > 0 && setInterval(() => setTimer(timer - 1), 1000);
    return () => clearInterval(interval as NodeJS.Timer);
  }, [timer]);

  useEffect(() => {
    const nextQuestionIndex = currentQuestionIndex + 1;

    if (timer === 0 && nextQuestionIndex < questionsAmount) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setTimer(DEFAULT_TIME_TO_RESPOND);
    }
  }, [timer, currentQuestionIndex, questionsAmount]);

  useEffect(() => {
    if (isTestFinished) {
      Router.push(ROUTES.OPEN_QUESSTION);
    }
  }, [isTestFinished]);

  return (
    <StyledQuestionContainer>
      <StyledQuestionBox>
        <StyledQuestionHeader>
          <Typography>
            {currentQuestionIndex + 1}/{questionsAmount}
          </Typography>
          <StyledTimerContainer>
            <Timer timeLeft={timer} timeForResponse={timeForResponse}></Timer>
          </StyledTimerContainer>
        </StyledQuestionHeader>
        <Question
          question={questionsData[currentQuestionIndex]}
          onAnswerSet={handleAnswerSet}
        />
        <StyledQuestionFooter>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            SUBMIT
          </Button>
        </StyledQuestionFooter>
      </StyledQuestionBox>
    </StyledQuestionContainer>
  );
};

export default QuestionContainer;
