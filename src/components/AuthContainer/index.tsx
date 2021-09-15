import {
  Container,
  createStyles,
  makeStyles, Theme
} from "@material-ui/core";
import { Props, SignInProviderProps } from "./types";
import GitHubAuthButton from '@components/AuthContainer/GitHubAuthButton';
import { signIn, SignInResponse } from "next-auth/client";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }),
);
const AuthContainer: React.FC<Props> = () => {

  const classes = useStyles();

  const handleAuth = async ({ provider, options, authorizationParams }: SignInProviderProps) => {
    try {
      const signInResponse = await signIn(provider, options, authorizationParams);
      const { error } = signInResponse || {} as SignInResponse;
      if (error) {
        console.log(error);
        return;
      }
      /* 
        TODO
        - check if user with such email exists in db
        - if user exists and didn`t start the quiz navigate to "/"
        - if user exists and passed the quiz navigate to "/resulst" and call singOut()
        - if user not exists navigate to "/profile" and create new user with additional info
      */
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <GitHubAuthButton onAuth={handleAuth}></GitHubAuthButton>
    </Container>
  )
};

export default AuthContainer;