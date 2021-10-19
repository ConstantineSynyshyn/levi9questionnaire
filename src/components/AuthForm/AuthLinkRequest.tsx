import React from "react"

import AuthLinkRequestComponent from "./AuthLinkRequestComponent"
import useStyles from "./useStyles"
import { AUTO_LOGIN } from "@constants/apiRoutes"

const getAuthLinkFormSuccessMessage = (email: string): string =>
  `Login link has been sent to ${email}`

const AuthLinkRequest: React.FC = () => {
  const classes = useStyles()
  const [emailValue, setEmailValue] = React.useState("")
  const [errorMessage, setErrorMessage] = React.useState(null)

  const [successMessage, setSuccessMessage] = React.useState("")

  const emailChangeHandler = (event: React.ChangeEvent<any>) => {
    const newEmailValue = event?.target?.value
    setEmailValue(newEmailValue)
  }
  const submitFn = (event: React.SyntheticEvent) => {
    async function submitHandler() {
      const res: any = await fetch(AUTO_LOGIN, {
        method: "POST",
        body: JSON.stringify({ email: emailValue }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const response = await res.json()
      if (response?.error) {
        setErrorMessage(response?.error)
        return
      }

      setSuccessMessage(getAuthLinkFormSuccessMessage(emailValue))
      return
    }
    event.preventDefault()
    submitHandler()
  }

  return (
    <AuthLinkRequestComponent
      emailValue={emailValue}
      emailChangeHandler={emailChangeHandler}
      containerClassName={classes.paper}
      avatarClassName={classes.avatar}
      buttonClassName={classes.submit}
      errorMessage={errorMessage}
      successMessage={successMessage}
      submitFn={submitFn}
    />
  )
}

export default AuthLinkRequest
