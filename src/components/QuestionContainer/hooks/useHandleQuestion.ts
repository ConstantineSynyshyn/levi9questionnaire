import { useCallback, useState } from "react";

import { SUBMIT_QUESTION_URL } from '@constants/apiRoutes';
import { QuizQuestionInfoType } from "@types/question";
import { HandleChange, HandleSubmit } from "../types";

interface State extends QuizQuestionInfoType {
  isLoading: boolean;
}

interface HandleQuestionInfo extends QuizQuestionInfoType {
  currentValue?: string | ReadonlyArray<string>;
  onSubmit: HandleSubmit;
  onChange: HandleChange;
}

const useHandleQuestion = (
  initialState: QuizQuestionInfoType
): HandleQuestionInfo => {
  const [currentQuestionInfo, setCurrentQuestionInfo] = useState<State>({
    ...initialState,
    isLoading: false,
  });
  const [currentValue, setCurrentValue] = useState<
    string | ReadonlyArray<string> | undefined
  >();
  const { isLoading, nextQuestion, ...rest } = currentQuestionInfo;
  const onSubmit = useCallback(() => {
    if (currentValue) {
      setCurrentQuestionInfo((currentState) => ({
        ...currentState,
        isLoading: true,
      }));
      const formData = new FormData();
      formData.append("answer", JSON.stringify(currentValue));
      fetch(SUBMIT_QUESTION_URL, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setCurrentQuestionInfo({
              ...data,
              isLoading: false,
            });
            setCurrentValue(undefined);
          } else {
            setCurrentQuestionInfo((currentState) => ({
              ...currentState,
              isLoading: false,
            }));
          }
        })
        .catch((error) => {
          setCurrentQuestionInfo((currentState) => ({
            ...currentState,
            isLoading: false,
          }));
          console.log("upload failed", error);
        });
    }
  }, [currentValue, nextQuestion]);

  const onChange = useCallback((value) => {
    setCurrentValue(value);
  }, []);
  return {
    ...rest,
    nextQuestion,
    currentValue,
    onSubmit,
    onChange,
  };
};

export default useHandleQuestion;
