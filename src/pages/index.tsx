import React from "react";
import Router from "next/router";

import Container from "@material-ui/core/Container";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { getSession } from "next-auth/client";

import type { Page } from "../types/page";
import { ROUTES } from "@constants/routes";
import { DEFAULT_OPEN_QUESTION_TIME_TO_RESPOND, DEFAULT_TIME_TO_RESPOND } from "@constants/configuration";

const IndexPage: Page = () => {
  return (
    <Box component="div" p={2}>
      <Typography variant="h3" color="textPrimary" gutterBottom>
        Welcome!
      </Typography>
      <Typography variant="body1" color="textPrimary" gutterBottom>
        You have only one attempt.
      </Typography>
      <Typography variant="body1" color="textPrimary" gutterBottom>
        Stage one: quiz questions with {DEFAULT_TIME_TO_RESPOND} seconds time limit for each.
      </Typography>
      <Typography variant="body1" color="textPrimary" gutterBottom>
        Stage two: practical questions with {DEFAULT_OPEN_QUESTION_TIME_TO_RESPOND} seconds time limit for each.
      </Typography>
      <Typography variant="body1" color="textPrimary" gutterBottom>
        Stage three: English language quiz.
      </Typography>
      <Typography variant="body1" color="textPrimary" gutterBottom>
        Click start when you are ready. Have fun! &#128293;
      </Typography>
      <Box display="flex" justifyContent="center" component="div" m={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            Router.push(ROUTES.QUIZ)
          }}
        >
          Start
        </Button>
      </Box>
    </Box>
  );
};
export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

IndexPage.getLayout = (page) => (
  <Container maxWidth="md" disableGutters>
    {page}
  </Container>
);

export default IndexPage;
