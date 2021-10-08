import { useRouter } from 'next/router'
import React, { ChangeEvent } from "react";

import { ROUTES } from '@constants/routes';
import { QuizQuestionInfoType } from "../../types/question";
import useHandleQuestion from "./hooks/useHandleQuestion";
import QuestionContainerComponent from "./QuestionContainerComponent";

interface Props extends QuizQuestionInfoType {}

const QuestionContainer: React.FC<Props> = (props) => {
  const {
    nextQuestion,
    total,
    passed,
    startedAt,
    passedAt,
    onChange,
    onSubmit,
    currentValue,
    isLoading,
  } = useHandleQuestion(props);
  const router = useRouter();
  const handleSubmit = React.useCallback(() => {
    onSubmit();
  }, [onSubmit]);
  const handleChange = React.useCallback(
    (event: ChangeEvent<any>) => {
      onChange(event.target.value);
    },
    [onChange]
  );
  if (typeof window !== 'undefined' && passedAt) {
    router.push(ROUTES.CONGRATULATION);
    return null;
  }
  const currentQuestionNumber = (passed || 0) + 1

  return (
    <QuestionContainerComponent
      question={nextQuestion}
      totalAmount={total}
      startedAt={startedAt}
      currentQuestionNumber={currentQuestionNumber}
      onChange={handleChange}
      onSubmit={handleSubmit}
      currentValue={currentValue}
      isLoading={isLoading}
    />
  );
};

export default QuestionContainer;
