import React from "react";
import { GetServerSideProps } from "next";
import Router from "next/router";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { session as getSession } from "next-auth/client";

import { Page } from "../types/page";
import { ROUTES } from "@constants/routes";
import {
  DEFAULT_OPEN_QUESTION_TIME_TO_RESPOND,
  DEFAULT_TIME_TO_RESPOND,
} from "@constants/configuration";
import { getUserByEmail } from "@db/entities/User";

interface Props {
  isQuizStarted: boolean;
  isQuizEnded: boolean;
  userName: string | null;
}

const IndexPage: Page<Props> = (props) => {
  const { isQuizStarted, userName, isQuizEnded = false } = props;
  const quizInfoBlock = React.useMemo(() => {
    if (isQuizEnded) {
      return (
        <Box display="flex" justifyContent="center" component="div" m={2}>
          <Typography variant="h5" color="textPrimary" gutterBottom>
            Quiz is already ended
          </Typography>
        </Box>
      );
    }
    if (isQuizStarted) {
      return (
        <Box display="flex" justifyContent="center" component="div" m={2}>
          <Typography variant="h5" color="textPrimary" gutterBottom>
            Quiz is already started
          </Typography>
        </Box>
      );
    }
    return (
      <Box display="flex" justifyContent="center" component="div" m={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            Router.push(ROUTES.QUIZ);
          }}
        >
          Start
        </Button>
      </Box>
    );
  }, [isQuizStarted, isQuizEnded]);
  return (
    <Box component="div" p={2}>
      <Typography variant="h3" color="textPrimary" gutterBottom>
        Welcome {userName}!
      </Typography>
      <Box mb={4}>
        <Typography variant="h6" color="textPrimary" gutterBottom>
          Thank you for taking time to pass the test.
        </Typography>
      </Box>
      <Box mb={4}>
        <Typography variant="body1" color="textPrimary" gutterBottom>
          Please keep in mind the following:
        </Typography>
        <ul>
          <li>
            <Typography variant="body1" color="textPrimary" gutterBottom>
              You have only one opportunity to submit your test.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" color="textPrimary" gutterBottom>
              Stage one: quiz questions with {DEFAULT_TIME_TO_RESPOND} seconds time
              limit for each.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" color="textPrimary" gutterBottom>
              Stage two: practical questions with {DEFAULT_OPEN_QUESTION_TIME_TO_RESPOND} seconds time limit for each.
            </Typography>
          </li>
        </ul>
        <Typography variant="body1" color="textPrimary" gutterBottom>
          Click START when you are ready.
        </Typography>
      </Box>
      <Typography variant="body1" color="textPrimary" gutterBottom>
        We wish you the best of luck and have fun! &#128293;
      </Typography>
      {quizInfoBlock}
    </Box>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const currentUser = session?.user?.email
    ? await getUserByEmail(session.user.email)
    : null;
  const userName = currentUser?.details?.name || currentUser?.email || null;
  const isQuizEnded = Boolean(currentUser?.quizEndTime);
  if (isQuizEnded) {
    return {
      redirect: {
        destination: ROUTES.CONGRATULATION,
        permanent: false,
      },
    }
  }
  return {
    props: {
      userName,
      isQuizStarted:
        Boolean(currentUser?.quizStartTime) &&
        Boolean(currentUser?.initialQuestions),
      isQuizEnded,
    },
  };
};

IndexPage.getLayout = (page) => (
  <Container maxWidth="md" disableGutters>
    {page}
  </Container>
);

IndexPage.requireAuth = true;

export default IndexPage;
