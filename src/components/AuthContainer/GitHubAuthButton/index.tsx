import {
    Button,
    makeStyles, Theme
} from "@material-ui/core";
import { GitHub } from '@material-ui/icons';
import { GITHUB_SIGN_IN_PROVIDER_CONFIG } from "./config";
import { Props } from "./types";

const useStyles = makeStyles((theme: Theme) => ({
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

    return (<Button
        variant="contained"
        size="medium"
        fullWidth
        className={classes.button}
        onClick={() => onAuth(GITHUB_SIGN_IN_PROVIDER_CONFIG)}
        startIcon={<GitHub />}
    >
        Sign in with GitHub
    </Button>)
};

export default GitHubAuthButton;