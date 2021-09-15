import {
    Button,
    createStyles,
    makeStyles, Theme
} from "@material-ui/core";
import { GitHub } from '@material-ui/icons';
import { SignInProviderProps } from "../types";
import { Props } from "./types";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            marginBottom: theme.spacing(2),
            backgroundColor: 'rgba(36, 41, 47, 0.87)',
            color: '#fff',
            '&:hover': {
                backgroundColor: 'rgba(36, 41, 47, 1)',
            },
            '&:focus': {
                backgroundColor: 'rgba(36, 41, 47, 1)',
            },
        },
    }),
);

const GitHubAuthButton: React.FC<Props> = ({onAuth}) => {
    const classes = useStyles();

    const signInProviderProps: SignInProviderProps = {
        provider: 'github',
    }

    return (<Button
        variant="contained"
        size="medium"
        fullWidth
        className={classes.button}
        onClick={() => onAuth(signInProviderProps)}
        startIcon={<GitHub />}
    >
        Sign in with GitHub
    </Button>)
};

export default GitHubAuthButton;