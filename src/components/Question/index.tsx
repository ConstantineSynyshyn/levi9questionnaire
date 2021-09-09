import React from "react";

import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";

import { StyledPaper, StyledTextContainer } from "./styles";
import { Props } from "./types";
import {
  Question as QuestionType,
  QuestionWithOptions,
} from "../../types/question";

const isInstanceOfTestQuestion = (
  question: QuestionType | QuestionWithOptions
): question is QuestionWithOptions => "options" in question;

const Question: React.FC<Props> = ({ question, onAnswerSet }) => {
  const [answer, setAnswer] = React.useState<string>("");

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = (event.target as HTMLInputElement).value;
      setAnswer(newValue);
      onAnswerSet(newValue);
    },
    [setAnswer, onAnswerSet]
  );

  const isTestQuestion = isInstanceOfTestQuestion(question);

  const input = React.useMemo(
    () =>
      (() =>
        isTestQuestion ? (
          <FormControl component="fieldset">
            <FormLabel component="legend">Options:</FormLabel>
            <FormGroup aria-label="options">
              {question.options.map((option) => (
                <Grid container item xs={6} key={option.id}>
                  <FormControlLabel
                    value={option.text}
                    control={<Checkbox onChange={handleChange} />}
                    label={option.text}
                  />
                </Grid>
              ))}
            </FormGroup>
          </FormControl>
        ) : (
          <>
            <TextField
              id="filled-multiline-flexible"
              label="Multiline"
              multiline
              fullWidth
              maxRows={4}
              value={answer}
              onChange={handleChange}
            />
          </>
        ))(),
    [isTestQuestion, answer, handleChange, question]
  );

  return (
    <StyledPaper elevation={3}>
      <StyledTextContainer>
        <Typography variant="h4" align="center">
          {question.questionText}
        </Typography>
      </StyledTextContainer>
      <Grid container spacing={2}>
        {input}
      </Grid>
    </StyledPaper>
  );
};

export default Question;
