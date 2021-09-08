import React, { useEffect, useState } from "react";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Question from "../Question";

import { DEFAULT_TIME_TO_RESPOND } from "../../constants/configuration";

import {
  StyledQuizBox,
  StyledQuizFooter,
  StyledQuizHeader,
  StyledTimerContainer,
  StyledQuizContainer,
} from "./styles";

import { Props } from "./types";

const Quiz: React.FC<Props> = ({
  questionsData,
  timeForResponse = DEFAULT_TIME_TO_RESPOND,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(timeForResponse);
  const [answers, setAnswers] = useState({});
  const [currentSelection, setCurrentSelection] = useState("");

  const handleAnswerSet = (answer: string) => {
    setCurrentSelection(answer);
  };

  const handleSubmit = () => {
    setTimer(15);

    const nextQuestionIndex = currentQuestionIndex + 1;
    const answerIndex = questionsData[currentQuestionIndex].id;

    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [answerIndex]: currentSelection,
    }));

    if (nextQuestionIndex < questionsData.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    }
  };

  useEffect(() => {
    const interval = timer > 0 && setInterval(() => setTimer(timer - 1), 1000);
    return () => clearInterval(interval as NodeJS.Timer);
  }, [timer]);

  useEffect(() => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    const questionsAmount = questionsData.length;

    if (timer === 0 && nextQuestionIndex < questionsAmount) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setTimer(15);
    }
  }, [timer, currentQuestionIndex]);

  return (
    <StyledQuizContainer>
      <StyledQuizBox>
        <StyledQuizHeader>
          <Typography>
            {currentQuestionIndex + 1}/{questionsData.length}
          </Typography>
          <StyledTimerContainer>
            <AccessTimeIcon />
            <Typography>{timer}</Typography>
          </StyledTimerContainer>
        </StyledQuizHeader>
        <Question
          question={questionsData[currentQuestionIndex]}
          onAnswerSet={handleAnswerSet}
        />
        <StyledQuizFooter>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            SUBMIT
          </Button>
        </StyledQuizFooter>
      </StyledQuizBox>
    </StyledQuizContainer>
  );
};

export default Quiz;
