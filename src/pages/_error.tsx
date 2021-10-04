import { NextPageContext } from "next"
import router from "next/router"
import React from "react"

import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"

import { Page } from "../types/page"
import { ROUTES } from "@constants/routes"

interface Props {
  statusCode?: number
}

const Error: Page<Props> = ({ statusCode }) => {
  const buttonClickHandler = () => {
    router.push(ROUTES.INDEX)
  }
  return (
    <Container maxWidth="md">
      <Typography variant="h1">
        {statusCode
          ? `Ooops... Something wrong happened! An error ${statusCode} occurred on server`
          : "An error occurred on client"}
      </Typography>
      <Box padding={3}>
        <Button onClick={buttonClickHandler}>Go home!</Button>
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
