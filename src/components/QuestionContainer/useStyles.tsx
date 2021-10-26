import makeStyles from "@material-ui/styles/makeStyles"

export const useStyles = makeStyles({
  questionHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "30px",
  },
  questionFooter: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "30px",
  },

  timerContainer: {
    width: "50px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  textContainer: {
    marginBottom: "30px",
  },

  codeContainer: {
    padding: "16px",
    backgroundColor: "lightgray",
    borderRadius: "5px",
    fontSize: "0.85rem",
    userSelect: "none",
    tabSize: "2",
    margin: "0 0 16px 0",
  },
  questionPaper: {
    padding: "50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
})
