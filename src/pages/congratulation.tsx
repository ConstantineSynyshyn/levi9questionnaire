import React from "react"
import { GetServerSideProps } from "next"
import { Container, Typography, Box } from "@material-ui/core"
import { Page } from "../types/page"
import { getUserByEmail } from "@db/entities/User"
import { getSession } from "next-auth/client"

interface Props {
  score: number;
}

const CongratulationPage: Page<Props> = ({ score }) => {
  return (
    <Box component="div" p={2}>
      <Typography variant="h3" color="textPrimary" gutterBottom>
        Congratulation! You’ve scored {score}.
      </Typography>
      <Typography variant="body1" color="textPrimary" gutterBottom>
        You will receive a confirmation email and be contacted by our Talent partner shortly.
      </Typography>
      <Typography variant="body1" color="textPrimary" gutterBottom>
        Look forward to meeting with you!
      </Typography>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const currentUser = session?.user?.email
    ? await getUserByEmail(session.user.email)
    : null;
  const score = currentUser?.quizScore || 0;

  return {
    props: {
      score
    },
  }
}

CongratulationPage.getLayout = (page) => (
  <Container maxWidth="md" disableGutters>
    {page}
  </Container>
)

CongratulationPage.requireAuth = true

export default CongratulationPage
