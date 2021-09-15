import React, { ChangeEvent } from "react";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { UserQuestionView } from '@types/question';
import QuestionComponent from "./QuestionComponent";

import {
  StyledQuestionBox,
  StyledQuestionFooter,
  StyledQuestionHeader,
  StyledTimerContainer,
  StyledQuestionContainer,
} from "./styles";

interface Props {
  question?: UserQuestionView;
  totalAmount: number;
  currentQuestionNumber: number;
  onChange: (e: ChangeEvent<any>) => void;
  onSubmit: () => void;
  currentValue?: string | ReadonlyArray<string>
}

const QuestionContainerComponent: React.FC<Props> = (props) => {
  const {
    question,
    totalAmount,
    currentQuestionNumber,
    onSubmit,
    onChange,
    currentValue,
  } = props;
  return (
    <StyledQuestionContainer>
      <StyledQuestionBox>
        <StyledQuestionHeader>
          <Typography>
            {currentQuestionNumber}/{totalAmount}
          </Typography>
          <StyledTimerContainer>
            {/* <Timer timeLeft={timer} timeForResponse={timeForResponse}></Timer>*/ }
          </StyledTimerContainer>
        </StyledQuestionHeader>
        {Boolean(question) && (
          <QuestionComponent
            question={question!}
            currentValue={currentValue}
            onChange={onChange}
          />
        )}
        <StyledQuestionFooter>
          <Button variant="contained" color="primary" onClick={onSubmit}>
            SUBMIT
          </Button>
        </StyledQuestionFooter>
      </StyledQuestionBox>
    </StyledQuestionContainer>
  );
};

export default React.memo(QuestionContainerComponent);
