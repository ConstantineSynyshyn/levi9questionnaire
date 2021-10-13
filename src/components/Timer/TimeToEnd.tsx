import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";
import { ROUTES } from "@constants/routes";

import TimeToEndComponent from "./components/TimeToEnd";
import useTimeToQuizEnd from "./hooks/useTimeToQuizEnd";
import { getTimeLeftString } from "@utils/index";

interface Props {
  startTime: number;
  quizSize: number;
  passedAt?: number;
}

const useStyles = makeStyles((theme) => ({
  linkStyles: {
    color: theme.palette.primary.contrastText,
    textDecoration: "underline",
    cursor: "pointer",
  },
}));

const TimeToEnd: React.FC<Props> = (props) => {
  const { startTime, quizSize, passedAt } = props;
  const classes = useStyles();
  const route = useRouter();
  const onClick = React.useCallback(() => {
    route.push(ROUTES.QUIZ);
  }, [route]);
  const { endTime, timeConfig } = useTimeToQuizEnd(
    startTime,
    quizSize,
    passedAt
  );
  const stringResult = useMemo(() => getTimeLeftString(timeConfig), [
    timeConfig,
  ]);
  return Boolean(endTime) ? (
    <TimeToEndComponent onClick={onClick} linkClass={classes.linkStyles}>
      {stringResult}
    </TimeToEndComponent>
  ) : null;
};

export default TimeToEnd;
