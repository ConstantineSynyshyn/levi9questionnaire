import React from "react";

import useQuizTimeInfo from "./hooks/useQuizTimeInfo";
import TimeToEnd from "./TimeToEnd";

const TopBarTimer: React.FC = () => {
  const quizInfo = useQuizTimeInfo() || {};

  const { startedAt, total, passedAt } = quizInfo;

  if (!startedAt || passedAt) {
    return null;
  }
  return <TimeToEnd startTime={startedAt} quizSize={total} />;
};

export default TopBarTimer;
