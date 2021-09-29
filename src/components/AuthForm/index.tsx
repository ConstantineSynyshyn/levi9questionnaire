import React from "react";
import { useRouter } from "next/router";

import { signIn, useSession } from "next-auth/client";
import {
  Container,
  CssBaseline,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
  makeStyles,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { SIGN_UP_API } from "../../constants/apiRoutes";
import AuthContainer from "@components/AuthContainer";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

async function createUser(email: string, password: string) {
  const response = await fetch(SIGN_UP_API, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

const AuthForm = () => {
  const [hasAnAccount, setHasAnAccount] = React.useState(false);
  const router = useRouter();
  const session = useSession();

  const classes = useStyles();
  const [emailValue, setEmailValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState(null);
  const toogleModeHandler = () => {
    setHasAnAccount((prevState) => !prevState);
  };

  const emailChangeHandler = (event: React.ChangeEvent<any>) => {
    const newEmailValue = event?.target?.value;
    setEmailValue(newEmailValue);
  };

  const passwordChangeHandler = (event: React.ChangeEvent<any>) => {
    const newPasswordValue = event?.target?.value;
    setPasswordValue(newPasswordValue);
  };

  async function submitHandler() {
    const result: ReturnType<typeof signIn> = await signIn("credentials", {
      redirect: false,
      email: emailValue,
      password: passwordValue,
    });
    if (!result?.error) {
      router.replace("/");
      return;
    }
    setErrorMessage(result?.error);
    return;
    /**
     * @TODO for now this logic is redundant, because we will use new way
     *       - /registration/{user@email.address}
     *       - user created but can't get it, he have receive email with token
     *       - click on confirm link and in this moment he is being logged in
     */
    /*
    try {
      const result = await createUser(emailValue, passwordValue)
      console.log(result)
    } catch (error) {
      setErrorMessage(error.message)
      console.log(error)
    }*/
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  value={emailValue}
                  onChange={emailChangeHandler}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  aria-label="email"
                  error={Boolean(errorMessage)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={passwordValue}
                  onChange={passwordChangeHandler}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  aria-label="password"
                  helperText={errorMessage}
                  error={Boolean(errorMessage)}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={submitHandler}
            >
              {hasAnAccount ? "Log me in" : "Sign me up"}
            </Button>
          </form>
        </div>
      </Container>
      <AuthContainer />
    </>
  );
};

export default AuthForm;
