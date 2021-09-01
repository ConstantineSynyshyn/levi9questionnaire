import React from "react";
import { AppBar, Toolbar, Container } from "@material-ui/core";
import Image from "next/image";

import { StyledImageContainer } from "./styles";

function Layout({ children }) {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <StyledImageContainer>
            <Image src="/levi9-logo.jpg" alt="Levi9-logo" layout="fill" />
          </StyledImageContainer>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">{children}</Container>
    </>
  );
}

export default Layout;
