import { useEffect, useMemo, useState } from "react";

import { LeftTimeType } from "../../../types";
import { getQuizEndTime, getTimeObject } from "@utils/index";
import useFinalizeQuiz from "./useFinalizeQuiz";

interface QuizEndType {
  endTime: number;
  timeConfig: LeftTimeType;
}

/**
 * Based on start time and total amount, this hook tracks time to quiz ends
 * Once it is ends - sending request to write end time to db
 * This  is not unique place. It will be the same logic on during preparing questions if.
 * One of them - on ssr logic, another one - api call for next question.
 */
const useTimeToQuizEnd = (
  startTime: number = 0,
  quizSize: number = 0,
  endTime?: number,
): QuizEndType => {
  const initialEndTime = useMemo(
    () => (startTime && quizSize ? getQuizEndTime(startTime, quizSize) : 0),
    [startTime, quizSize]
  );
  const [timeToEnd, setTimeToEnd] = useState(initialEndTime - Date.now());
  const [timeConfig, setTimeConfig] = useState(getTimeObject(timeToEnd));
  const finalizeQuizFn = useFinalizeQuiz();
  useEffect(() => {
    let timeout: any = null;
    if (startTime && quizSize && timeToEnd > 0) {
      timeout = setTimeout(() => {
        const now = Date.now();
        const timeDiff = initialEndTime - now;
        const newEndTime = timeDiff > 0 ? timeDiff : 0;
        const newTimeConfig = getTimeObject(newEndTime);
        setTimeToEnd(newEndTime);
        setTimeConfig(newTimeConfig);
      }, 1000);
    } else if (startTime && quizSize && timeToEnd === 0) {
      finalizeQuizFn();
    }
    return () => {
      timeout && clearTimeout(timeout);
    }
  }, [initialEndTime, timeToEnd, finalizeQuizFn, endTime]);

  return {
    timeConfig,
    endTime: timeToEnd,
  };
};

export default useTimeToQuizEnd;
