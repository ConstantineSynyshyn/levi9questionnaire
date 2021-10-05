import { useRouter } from "next/router";
import React from "react";

import AuthLinkRequestComponent from "./AuthLinkRequestComponent";
import useStyles from "./useStyles";
import { AUTO_LOGIN } from "@constants/apiRoutes";

const AuthLinkRequest: React.FC = () => {
  const classes = useStyles();
  const router = useRouter();
  const [emailValue, setEmailValue] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState(null);

  const emailChangeHandler = (event: React.ChangeEvent<any>) => {
    const newEmailValue = event?.target?.value;
    setEmailValue(newEmailValue);
  };
  const submitFn = React.useCallback(() => {
    async function submitHandler() {
      const res: any = await fetch(AUTO_LOGIN, {
        method: "POST",
        body: JSON.stringify({ email: emailValue }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();
      if (response?.error) {
        setErrorMessage(response?.error);
        return;
      }
      return;
    }
    submitHandler();
  }, [emailValue, router]);

  return (
    <AuthLinkRequestComponent
      emailValue={emailValue}
      emailChangeHandler={emailChangeHandler}
      containerClassName={classes.paper}
      avatarClassName={classes.avatar}
      buttonClassName={classes.submit}
      errorMessage={errorMessage}
      submitFn={submitFn}
    />
  );
};

export default AuthLinkRequest;
