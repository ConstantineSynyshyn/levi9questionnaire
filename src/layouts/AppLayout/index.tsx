import React from "react";

import Image from "next/image";

import { AppBar, Toolbar } from "@material-ui/core";

const AppLayout: React.FC = ({ children }) => (
  <>
    <AppBar position="static">
      <Toolbar>
        <Image
          src="/logo-full-white.png"
          alt="Levi9-logo"
          width="72px"
          height="36px"
        />
      </Toolbar>
    </AppBar>
    {children}
  </>
);

export default AppLayout;
