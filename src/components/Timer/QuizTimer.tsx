import React from "react";
import { useRouter } from "next/router";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import { ROUTES } from "@constants/routes";
import { getQuizTime } from "@utils/index";
import useTimeToQuizEnd from "./hooks/useTimeToQuizEnd";

interface Props {
  startTime: number;
  quizSize: number;
  passedAt?: number;
}

const textBoxStyles = {
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const timerBoxStyles = { position: "relative", display: "inline-flex" };

const QuizTimer: React.FC<Props> = (props) => {
  const { startTime, quizSize, passedAt } = props;
  const route = useRouter();
  const { endTime } = useTimeToQuizEnd(startTime, quizSize, passedAt);
  const timeToEnd = Math.floor(endTime / 1000);
  React.useEffect(() => {
    if (endTime <= 0) {
      route.push(ROUTES.INDEX);
    }
  }, [endTime, route]);
  const progress = Math.floor(
    ((endTime) / getQuizTime(quizSize)) * 100
  );
  return (
    <Box sx={timerBoxStyles}>
      <CircularProgress variant="determinate" value={progress} />
      <Box sx={textBoxStyles}>
        <Typography variant="caption" component="div" color="secondary">
          {timeToEnd}s
        </Typography>
      </Box>
    </Box>
  );
};

export default QuizTimer;
