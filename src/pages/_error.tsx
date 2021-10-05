import { NextPageContext } from "next"
import router from "next/router"
import React from "react"

import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"

import { Page } from "../types/page"
import { ROUTES } from "@constants/routes"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(3),
  },
}))

interface Props {
  statusCode?: number
}

const Error: Page<Props> = ({ statusCode }) => {
  const classes = useStyles()
  const buttonClickHandler = () => {
    router.push(ROUTES.INDEX)
  }
  return (
    <Container maxWidth="md">
      <Box m={2}>
        <Typography variant="h3">Ooops... Something went wrong.</Typography>
        {statusCode && (
          <Typography variant="body1">
            {`Issue occured on our side. Server responded with ${statusCode}`}
          </Typography>
        )}
      </Box>
      <Box className={classes.buttonContainer}>
        <Button variant="contained" size="large" onClick={buttonClickHandler}>
          Go home!
        </Button>
      </Box>
    </Container>
  )
}

Error.getInitialProps = async ({
  res,
  err,
}: NextPageContext): Promise<Props> => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
