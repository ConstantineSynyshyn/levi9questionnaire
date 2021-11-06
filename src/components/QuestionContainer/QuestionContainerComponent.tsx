import React, { ChangeEvent } from "react"

import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"

import QuizTimer from "@components/Timer/QuizTimer"
import { UserQuestionView } from "../../types/question"
import QuestionComponent from "./QuestionComponent"

import { useStyles } from "./useStyles"

interface Props {
  question?: UserQuestionView
  startedAt: number
  totalAmount: number
  currentQuestionNumber: number
  passedAt?: number
  onChange: (e: ChangeEvent<any>) => void
  onSubmit: () => void
  currentValue?: string | ReadonlyArray<string>
  isLoading: boolean
}

const QuestionContainerComponent: React.FC<Props> = (props) => {
  const {
    startedAt,
    question,
    totalAmount,
    currentQuestionNumber,
    onSubmit,
    onChange,
    currentValue,
    passedAt,
    isLoading,
  } = props
  const classes = useStyles()
  return (
    <div>
      <Container component="main" maxWidth="xl" disableGutters>
        <div className={classes.questionHeader}>
          <Typography>
            {currentQuestionNumber}/{totalAmount}
          </Typography>
          <div className={classes.timerContainer}>
            <QuizTimer
              startTime={startedAt}
              quizSize={totalAmount}
              passedAt={passedAt}
            />
          </div>
        </div>
        {Boolean(question) && (
          <QuestionComponent
            question={question!}
            currentValue={currentValue}
            onChange={onChange}
          />
        )}
        <div className={classes.questionFooter}>
          <Button
            variant="contained"
            color="primary"
            onClick={onSubmit}
            disabled={isLoading}
          >
            SUBMIT
          </Button>
        </div>
      </Container>
    </div>
  )
}

export default React.memo(QuestionContainerComponent)
