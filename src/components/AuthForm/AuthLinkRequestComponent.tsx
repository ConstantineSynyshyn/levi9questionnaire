import React from "react"
import { Avatar, Button, TextField, Typography } from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/core/SvgIcon/SvgIcon"

interface Props {
  emailValue: string
  emailChangeHandler: (event: React.ChangeEvent<any>) => void
  containerClassName: string
  avatarClassName: string
  buttonClassName: string
  errorMessage: string | null
  successMessage: string | null
  submitFn: (event: React.SyntheticEvent) => void
}

const AuthLinkRequestComponent: React.FC<Props> = (props) => {
  const {
    emailValue,
    emailChangeHandler,
    containerClassName,
    avatarClassName,
    buttonClassName,
    errorMessage,
    successMessage,
    submitFn,
  } = props
  return (
    <div className={containerClassName}>
      <Avatar className={avatarClassName}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography variant="h5">Request for login link</Typography>
      <form noValidate onSubmit={submitFn}>
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
          helperText={errorMessage}
          error={Boolean(errorMessage)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={buttonClassName}
          onClick={submitFn}
        >
          Send auth link
        </Button>
      </form>
      {successMessage && <Typography>{successMessage}</Typography>}
    </div>
  )
}

export default React.memo(AuthLinkRequestComponent)
