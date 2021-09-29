import { Container } from "@material-ui/core";
import { GetServerSideProps } from "next";
import React from "react";

import { Page } from "../../../types";
import ConfirmEmail from "@components/AutoRegistration/ConfirmEmail";

interface Props {
  hash: string;
}

const Confirm: Page<Props> = ({ hash }) => {
  return (<ConfirmEmail hash={hash} />);
};

Confirm.getLayout = (page) => (
  <Container maxWidth="md" disableGutters>
    {page}
  </Container>
);

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { hash = '' } = query;
  return {
    props: { hash },
  };
};

export default Confirm;
