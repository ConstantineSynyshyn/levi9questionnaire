import React from "react";

import { getSession } from "next-auth/client";
import { Page } from "../types/page";
import { useRouter } from "next/router";
import { Container } from "@material-ui/core";
import AuthForm from "../components/AuthForm";

const AuthPage: Page = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    (async function tryLogin() {
      const session = await getSession();
      if (session) {
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    })();
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <AuthForm />;
};

AuthPage.getLayout = (page) => (
  <Container maxWidth="md" disableGutters>
    {page}
  </Container>
);

export default AuthPage;
