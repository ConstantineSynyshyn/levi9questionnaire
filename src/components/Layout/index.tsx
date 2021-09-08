import React from "react";

import Image from "next/image";

import { AppBar, Toolbar, Container } from "@material-ui/core";

const Layout: React.FC<{ children: React.ReactChildren }> = ({ children }) => (
  <>
    <AppBar position="static">
      <Toolbar>
        <Image
          src="/levi9-logo.jpg"
          alt="Levi9-logo"
          width="64px"
          height="64px"
        />
      </Toolbar>
    </AppBar>
    <Container maxWidth="md" disableGutters>
      {children}
    </Container>
  </>
);

export default Layout;
