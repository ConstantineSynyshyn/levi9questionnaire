import React from "react"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import List from "@material-ui/core/List"
import Accordion from "@material-ui/core/Accordion"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline"
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined"

import { InitialUseQuestion } from "@db/entities/User/types"
import QuestionItemDetails from "./QuestionItemDetails"

interface Props
  extends Pick<InitialUseQuestion, "questionText" | "data" | "options"> {
  dataBlockClassName: string
  questionStatusClassName: string
  userAnswer: string | null
  isCorrect: boolean
  questionNum: number
  isExpanded: boolean
  handleExpand: () => void
}

const QuestionDetails: React.FC<Props> = (props) => {
  const {
    questionText,
    data,
    options,
    dataBlockClassName,
    questionStatusClassName,
    userAnswer,
    questionNum,
    isCorrect,
    isExpanded,
    handleExpand,
  } = props
  const icon = isCorrect ? (
    <CheckCircleOutlineIcon className={questionStatusClassName} />
  ) : (
    <CancelOutlinedIcon className={questionStatusClassName} />
  )
  return (
    <Accordion expanded={isExpanded} onChange={handleExpand}>
      <AccordionSummary>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item xs={11}>{`${questionNum}. ${questionText}`}</Grid>
          <Grid item xs={1}>
            {icon}
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container direction="column">
          <Grid item>
            <Typography variant="body1">{questionText}</Typography>
          </Grid>
          {Boolean(data) && (
            <Grid item>
              <Box className={dataBlockClassName}>{data}</Box>
            </Grid>
          )}
          <Grid item>
            <List>
              {options.map(({ text, isCorrect: isItemCorrect }) => (
                <QuestionItemDetails
                  key={text}
                  text={text}
                  isCorrectItem={isItemCorrect}
                  userAnswer={userAnswer}
                />
              ))}
            </List>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}

export default QuestionDetails
