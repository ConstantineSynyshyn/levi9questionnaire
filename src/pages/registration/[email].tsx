import { Container } from "@material-ui/core";
import { GetServerSideProps } from "next";
import React from "react";

import { Page } from "../../types/page";
import AutoRegistration from "@components/AutoRegistration";
import { handleAutoRegistration } from "@services/RequestManager/handleAutoRegistration";

interface Props {
  email: string;
  result?: any;
  error?: any;
}

const Registration: Page<Props> = (props) => {
  console.log("Registration", props);
  return <AutoRegistration {...props} />;
};

Registration.getLayout = (page) => (
  <Container maxWidth="md" disableGutters>
    {page}
  </Container>
);

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { email = "" } = query;
  const result = (await handleAutoRegistration(email as string)) || {};
  return {
    props: { email, ...result },
  };
};

export default Registration;
