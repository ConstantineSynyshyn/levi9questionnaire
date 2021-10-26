import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import makeStyles from "@material-ui/core/styles/makeStyles"
import React from "react"

import { QuizAnaliseInfo } from "@services/QuestionManager/types"
import QuestionDetails from "./components/QuestionDetails"
import useResultDownload from "./useResultDownload"

const questionContainerId = "quiz-result-container"

const useStyles = makeStyles((theme) => ({
  dataContainer: {
    padding: theme.spacing(2),
    backgroundColor: "lightgray",
    borderRadius: "5px",
    fontSize: "0.85rem",
    userSelect: "none",
    tabSize: 2,
  },
  correctItem: {
    color: theme.palette.success.main,
  },
  incorrectItem: {
    color: theme.palette.error.main,
  },
  noAnswerItem: {
    color: theme.palette.grey[500],
  },
}))

interface Props {
  quizResult: QuizAnaliseInfo
  email: string
}

const QuizResult: React.FC<Props> = ({ quizResult, email }) => {
  const classes = useStyles()
  const handleDownload = useResultDownload(questionContainerId, email)
  const [expandedAll, setExpandedAll] = React.useState(false)
  const [expanded, setExpanded] = React.useState<undefined | number>()
  const { value, answerFullMap = [] } = quizResult
  const content = React.useMemo(
    () =>
      answerFullMap.map((questionInfo, num) => {
        const { question, isCorrect, userAnswer } = questionInfo
        const { questionText, data, options } = question
        const questionStatusClassName = !Boolean(userAnswer)
          ? classes.noAnswerItem
          : isCorrect
          ? classes.correctItem
          : classes.incorrectItem
        return (
          <QuestionDetails
            key={`${questionText}_${num}`}
            questionText={questionText}
            data={data}
            options={options}
            userAnswer={userAnswer}
            isCorrect={isCorrect}
            dataBlockClassName={classes.dataContainer}
            questionNum={num + 1}
            questionStatusClassName={questionStatusClassName}
            isExpanded={expanded === num || expandedAll}
            handleExpand={() => { setExpanded(num) }}
          />
        )
      }),
    [answerFullMap, classes, expanded, expandedAll]
  )
  const onDownloadClick = React.useCallback(() => {
    setExpandedAll(true)
    // @todo dirty hack but it doesnt make sense to make more stable solution
    setTimeout(() => {
      handleDownload()
    }, 1000)
  }, [handleDownload])
  return (
    <Grid container direction="column">
      <Grid item>
        <Button variant="contained" color="primary" onClick={onDownloadClick}>
          Download Result
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Box p={2} id={questionContainerId}>
          <Typography variant="h5" color="secondary">
            The value is: {value}
          </Typography>
          {content}
        </Box>
      </Grid>
    </Grid>
  )
}

export default QuizResult
