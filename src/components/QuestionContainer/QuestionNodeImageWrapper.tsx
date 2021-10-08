import { makeStyles, Theme } from "@material-ui/core";

interface Props {}

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    position: "relative",
  },
  skeletonWrapper: {
    position: "absolute",
    height: "100%",
    width: "100%",
    overflow: "hidden",
    borderRadius: "5px",
    backgroundColor: theme.palette.background.default,
  },
  skeleton: {
    height: "100%",
  },
  noSelect: {
    "-webkit-touch-callout": "none",
    "-webkit-user-select": "none",
    "-khtml-user-select": "none",
    "-moz-user-select": "none",
    "-ms-user-select": "none",
    "user-select": "none",
  },
}));

const QuestionNodeImageWrapper: React.FC<Props> = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.noSelect}>{children}</div>;
};

export default QuestionNodeImageWrapper;
