import React, { useState } from "react";

import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import { StyledPaper, StyledTextContainer } from "./styles";
import { Props } from "./types";

const Question: React.FC<Props> = ({ question, onAnswerSet }) => {
  const [answer, setAnswer] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (event.target as HTMLInputElement).value;
    setAnswer(newValue);
    onAnswerSet(newValue);
  };

  return (
    <StyledPaper elevation={3}>
      <StyledTextContainer>
        <Typography variant="h4" align="center">
          {question.questionText}
        </Typography>
      </StyledTextContainer>
      <Grid container spacing={2}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Options:</FormLabel>
          <RadioGroup
            aria-label="options"
            name="options"
            value={answer}
            onChange={handleChange}
          >
            {question.options.map((option) => (
              <Grid container item xs={6} key={option.id}>
                <FormControlLabel
                  value={option.text}
                  control={<Checkbox />}
                  label={option.text}
                />
              </Grid>
            ))}
          </RadioGroup>
        </FormControl>
      </Grid>
    </StyledPaper>
  );
};

export default Question;
