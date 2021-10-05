import React from "react";

import { Container, CssBaseline, Grid } from "@material-ui/core";

import AuthLinkRequest from "./AuthLinkRequest";
import PlainAuthForm from "./PlainAuthForm";

const AuthForm: React.FC = () => {
  return (
    <Container component="main" maxWidth="xl" disableGutters>
      <CssBaseline />
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        spacing={2}
      >
        <Grid item xs={6}>
          <PlainAuthForm />
        </Grid>
        <Grid item xs={6}>
          <AuthLinkRequest />
        </Grid>
      </Grid>
    </Container>
  );
};

export default React.memo(AuthForm);
