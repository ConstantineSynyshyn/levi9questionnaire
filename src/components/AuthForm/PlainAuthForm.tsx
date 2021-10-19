import { signIn } from "next-auth/client"
import { useRouter } from "next/router"
import React from "react"

import PlainAuthFormComponent from "./PlainAuthFormComponent"
import useStyles from "./useStyles"

const PlainAuthForm: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const [emailValue, setEmailValue] = React.useState("")
  const [passwordValue, setPasswordValue] = React.useState("")
  const [errorMessage, setErrorMessage] = React.useState(null)

  const emailChangeHandler = (event: React.ChangeEvent<any>) => {
    const newEmailValue = event?.target?.value
    setEmailValue(newEmailValue)
  }

  const passwordChangeHandler = (event: React.ChangeEvent<any>) => {
    const newPasswordValue = event?.target?.value
    setPasswordValue(newPasswordValue)
  }
  const submitFn = (event: React.SyntheticEvent) => {
    async function submitHandler() {
      const result: ReturnType<typeof signIn> = await signIn("credentials", {
        redirect: false,
        email: emailValue,
        password: passwordValue,
      })

      if (!result?.error) {
        router.replace("/")
        return
      }
      setErrorMessage(result?.error)
      return
    }
    event.preventDefault()
    submitHandler()
  }

  return (
    <PlainAuthFormComponent
      emailValue={emailValue}
      passwordValue={passwordValue}
      emailChangeHandler={emailChangeHandler}
      passwordChangeHandler={passwordChangeHandler}
      containerClassName={classes.paper}
      avatarClassName={classes.avatar}
      buttonClassName={classes.submit}
      errorMessage={errorMessage}
      submitFn={submitFn}
    />
  )
}

export default PlainAuthForm
