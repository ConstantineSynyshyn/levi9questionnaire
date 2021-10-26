import React from "react"
import ListItem from "@material-ui/core/ListItem"
import makeStyles from "@material-ui/core/styles/makeStyles"

const useStyles = makeStyles((theme) => ({
  correctItem: {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.contrastText,
  },
  errorItem: {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.contrastText,
  },
}))

interface Props {
  text: string
  isCorrectItem: boolean
  userAnswer: string | null
}

const QuestionItemDetails: React.FC<Props> = (props) => {
  const { text, isCorrectItem, userAnswer } = props
  const classes = useStyles()

  let className = ''
  if (!isCorrectItem && (userAnswer === text)) {
    className = classes.errorItem
  }
  if (isCorrectItem) {
    className = classes.correctItem
  }
  return <ListItem className={className}>{text}</ListItem>
}

export default React.memo(QuestionItemDetails)
