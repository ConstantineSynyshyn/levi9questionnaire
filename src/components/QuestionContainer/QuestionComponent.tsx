import React, { ChangeEvent } from "react"

import Radio from "@material-ui/core/Radio"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import TextField from "@material-ui/core/TextField"

import { TaskCategory } from "@constants/configuration"
import { htmlDecode } from "@utils/index"
import { useStyles } from "./useStyles"
import { UserQuestionView } from "../../types/question"
import QuestionNodeImageWrapper from "./QuestionNodeImageWrapper"

interface Props {
  question: UserQuestionView
  onChange: (e: ChangeEvent<any>) => void
  currentValue?: string | ReadonlyArray<string>
}

const QuestionComponent: React.FC<Props> = (props) => {
  const { question, onChange, currentValue = "" } = props
  const { questionText, options, taskType, data } = question || {}
  const classes = useStyles()
  return (
    <Paper elevation={3} className={classes.questionPaper}>
      <div className={classes.textContainer}>
        <Typography variant="h4" align="center">
          <QuestionNodeImageWrapper>
            {htmlDecode(questionText)}
          </QuestionNodeImageWrapper>
        </Typography>
        {Boolean(data) && (
          <QuestionNodeImageWrapper>
            <pre className={classes.codeContainer}>{data}</pre>
          </QuestionNodeImageWrapper>
        )}
      </div>
      <Grid container spacing={2}>
        {taskType === TaskCategory.CODING ? (
          <TextField
            id="filled-multiline-flexible"
            label="Multiline"
            multiline
            fullWidth
            maxRows={4}
            value={currentValue}
            onChange={onChange}
          />
        ) : (
          <FormControl component="fieldset">
            <FormLabel component="legend">Options:</FormLabel>
            <RadioGroup
              aria-label="question"
              name="question"
              value={currentValue}
              onChange={onChange}
            >
              {options.map((text) => (
                <Grid item key={text}>
                  <FormControlLabel
                    value={text}
                    control={<Radio color="primary" />}
                    label={text}
                  />
                </Grid>
              ))}
            </RadioGroup>
          </FormControl>
        )}
      </Grid>
    </Paper>
  )
}

export default React.memo(QuestionComponent)
