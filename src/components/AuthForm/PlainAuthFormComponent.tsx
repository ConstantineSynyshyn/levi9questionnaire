import React from "react"
import { Avatar, Button, Grid, TextField, Typography } from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/core/SvgIcon/SvgIcon"

interface Props {
  emailValue: string
  passwordValue: string
  emailChangeHandler: (event: React.ChangeEvent<any>) => void
  passwordChangeHandler: (event: React.ChangeEvent<any>) => void
  containerClassName: string
  avatarClassName: string
  buttonClassName: string
  errorMessage: string | null
  submitFn: (event: React.SyntheticEvent) => void
}

const PlainAuthFormComponent: React.FC<Props> = (props) => {
  const {
    emailValue,
    passwordValue,
    emailChangeHandler,
    passwordChangeHandler,
    containerClassName,
    avatarClassName,
    buttonClassName,
    errorMessage,
    submitFn,
  } = props
  return (
    <div className={containerClassName}>
      <Avatar className={avatarClassName}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form onSubmit={submitFn} noValidate>
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
          className={buttonClassName}
          onClick={submitFn}
        >
          Log me in
        </Button>
      </form>
    </div>
  )
}

export default React.memo(PlainAuthFormComponent)
