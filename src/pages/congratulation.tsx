import React from "react"

import Container from "@material-ui/core/Container"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"

import { Page } from "@types/page"

const CongratulationPage: Page<Props> = () => {
  return (
    <Box component="div" p={2}>
      <Typography variant="h1" color="textPrimary" gutterBottom>
        Congratulation, your test if done.
      </Typography>
      <Typography variant="body1" color="textPrimary" gutterBottom>
        if you want to ran it one more time - got to DB and remove answers
      </Typography>
    </Box>
  )
}

CongratulationPage.getLayout = (page) => (
  <Container maxWidth="md" disableGutters>
    {page}
  </Container>
)

CongratulationPage.requireAuth = true

export default CongratulationPage
