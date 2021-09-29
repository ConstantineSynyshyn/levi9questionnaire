import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { User } from "@db/entities/User/types";
import { QuizAnaliseInfo } from "@services/QuestionManager/types";

export interface Props {
  requestedUser: string;
  user?: User;
  quizResult: QuizAnaliseInfo | null;
}

const UserDetails: React.FC<Props> = (props) => {
  const { requestedUser, user, quizResult } = props;

  const quizResultContent = React.useMemo(() => {
    if (!quizResult || quizResult?.value === undefined || !quizResult?.answerMap) {
      return null;
    }
    const { value, answerMap } = quizResult;
    return (
      <>
        <Typography variant="h5" color="secondary">
          The value is: {value}
        </Typography>
        {Object.entries(answerMap).map(([text, isCorrect]) => (
          <Typography variant="body1" color={isCorrect ? "primary" : "error"} key={text}>
            {text}
          </Typography>
        ))}
      </>
    )
  }, [quizResult]);
  if (!user) {
    return (
      <Typography variant="h3">
        {`Requested user ${requestedUser} doesn't exists`}
      </Typography>
    );
  }
  const { email, isConfirmed, quizStartTime, quizEndTime } = user;
  return (
    <Paper>
      <Box p={1}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Box p={0}>
              <Typography variant="h6">
                Email:
              </Typography>
              <Typography variant="body1">
                {email}
              </Typography>
            </Box>
            <Box pt={1}>
              <Typography variant="h6">
                Is email confirmed:
              </Typography>
              <Typography variant="body1">
                {isConfirmed ? "Yes" : "No"}
              </Typography>
            </Box>
            <Box pt={1}>
              <Typography variant="h6">
                Quiz started at
              </Typography>
              <Typography variant="body1">
                {quizStartTime
                  ? new Date(quizStartTime).toUTCString()
                  : "-"}
              </Typography>
            </Box>
            <Box pt={1}>
              <Typography variant="h6">
                Quiz passed at
              </Typography>
              <Typography variant="body1">
                {quizEndTime
                  ? new Date(quizEndTime).toUTCString()
                  : "-"}
              </Typography>
            </Box>
          </Grid>
          {Boolean(quizResultContent) && (
            <Grid item xs={8}>
              {quizResultContent}
            </Grid>
          )}
        </Grid>
      </Box>
    </Paper>
  );
};

export default UserDetails;
