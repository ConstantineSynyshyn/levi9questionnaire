import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress"
import Container from "@material-ui/core/Container"
import React from "react"

import useHandleAutoRegistration from "./hooks/useHandleAutoRegistration"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "480px",
  },
})

interface Props {
  hash: string
}

const ConfirmEmail: React.FC<Props> = ({ hash }) => {
  const [_, error] = useHandleAutoRegistration(hash)
  const classes = useStyles()
  if (error) {
    return (
      <Container maxWidth="md" disableGutters>
        <Box component="div" p={2}>
          <Typography variant="h3" color="textPrimary" gutterBottom>
            Login failed. Try to request new confirmation link or connect to
            administrator.
          </Typography>
        </Box>
      </Container>
    )
  }
  return (
    <Container maxWidth="md" disableGutters>
      <Box className={classes.container}>
        <CircularProgress disableShrink />
      </Box>
    </Container>
  )
}

export default ConfirmEmail
