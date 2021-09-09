import React from "react";

import Image from "next/image";

import { AppBar, Toolbar, Container } from "@material-ui/core";

const AppLayout: React.FC = ({ children }) => (
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
    {children}
  </>
);

export default AppLayout;
