import { useEffect, useState } from "react";

import { QUIZ_TIME_INFO } from "@constants/apiRoutes";
import { QuizQuestionInfoType } from "../../../types";

const useQuizTimeInfo = (): QuizQuestionInfoType | undefined => {
  const [quizInfo, setQuizInfo] = useState<QuizQuestionInfoType | undefined>();
  useEffect(() => {
    fetch(QUIZ_TIME_INFO, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((body) => {
        setQuizInfo(body);
      })
      .catch((error) => {
        console.log("quiz info loading failed", error);
      });
  }, []);
  return quizInfo;
};

export default useQuizTimeInfo;