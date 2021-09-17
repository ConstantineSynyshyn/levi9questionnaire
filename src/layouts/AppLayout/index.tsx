import {
  AppBar,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
} from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import Image from "next/image";
import { signOut, useSession } from "next-auth/client";
import React from "react";

import Sidebar from "./Sidebar/Sidebar";
import { useRouter } from "next/router";
import { ROUTES } from "@constants/routes";

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const AppLayout: React.FC = ({ children }) => {
  const classes = useStyles();
  const [session] = useSession();
  const route = useRouter();
  const goHome = React.useCallback(() => route.push(ROUTES.INDEX), [route]);
  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.topBar}>
          <Image
            src="/logo-full-white.png"
            alt="Levi9-logo"
            width="72px"
            height="36px"
            onClick={goHome}
          />
          {session ? (
            <IconButton
              edge="end"
              aria-label="sign out"
              onClick={() => signOut()}
              color="inherit"
            >
              <ExitToApp />
            </IconButton>
          ) : null}
        </Toolbar>
      </AppBar>
      <Sidebar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </>
  );
};

export default AppLayout;
