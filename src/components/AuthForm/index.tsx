import React, { SyntheticEvent } from "react";
import { useRouter } from "next/router";

import { signIn, useSession } from "next-auth/client";
import {
  Container,
  CssBaseline,
  Avatar,
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  makeStyles,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { SIGN_UP_API } from "../../constants/apiRoutes";
import AuthContainer from '@components/AuthContainer';

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
<<<<<<< Updated upstream
  const [hasAnAccount, setHasAnAccount] = React.useState(false);
  const router = useRouter();
  const session = useSession();
  console.log('session', session);

  const classes = useStyles();
  const [emailValue, setEmailValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");
=======
  const [hasAnAccount, setHasAnAccount] = React.useState(false)
  const router = useRouter()
  const session = useSession()

  const classes = useStyles()
  const [emailValue, setEmailValue] = React.useState("")
  const [passwordValue, setPasswordValue] = React.useState("")
  const [errorMessage, setErrorMessage] = React.useState(null)
>>>>>>> Stashed changes
  const toogleModeHandler = () => {
    setHasAnAccount((prevState) => !prevState);
  };

  const emailChangeHandler = (event: SyntheticEvent) => {
    const newEmailValue = event.target.value;
    setEmailValue(newEmailValue);
  };

  const passwordChangeHandler = (event: SyntheticEvent) => {
    const newPasswordValue = event.target.value;
    setPasswordValue(newPasswordValue);
  };

  async function submitHandler() {
    if (hasAnAccount) {
      const result = await signIn("credentials", {
        redirect: false,
        email: emailValue,
        password: passwordValue,
<<<<<<< Updated upstream
      });

      if (!result?.error) {
        router.replace("/");
      }

      return;
=======
      })
      if (!result?.error) {
        router.replace("/")
        return
      }
      setErrorMessage(result?.error)
      return
>>>>>>> Stashed changes
    }

    try {
      const result = await createUser(emailValue, passwordValue);
      console.log(result);
    } catch (error) {
<<<<<<< Updated upstream
      console.log(error);
    }
  }

  return (<>
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
              />
=======
      setErrorMessage(error.message)
      console.log(error)
    }
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
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={hasAnAccount}
                      color="primary"
                      onClick={toogleModeHandler}
                    />
                  }
                  label="I already have an account"
                />
              </Grid>
>>>>>>> Stashed changes
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
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    value={hasAnAccount}
                    color="primary"
                    onClick={toogleModeHandler}
                  />
                }
                label="I already have an account"
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
    <AuthContainer></AuthContainer>
    </>
  );
};

export default AuthForm;
