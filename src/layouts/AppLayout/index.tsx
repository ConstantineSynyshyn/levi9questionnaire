import { AppBar, createStyles, IconButton, makeStyles, Theme, Toolbar } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import Image from "next/image";
import { signOut, useSession } from 'next-auth/client';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }));

const AppLayout: React.FC = ({ children }) => {
  const classes = useStyles();
  const [session] = useSession();

  return (
    <>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Image
            src="/logo-full-white.png"
            alt="Levi9-logo"
            width="72px"
            height="36px"
          />
          {session ? (<IconButton
            edge="end"
            aria-label="sign out"
            onClick={() => signOut()}
            color="inherit"
          >
            <ExitToApp />
          </IconButton>) : null}
        </Toolbar>
      </AppBar>
      {children}
    </>
  )
}

export default AppLayout;
