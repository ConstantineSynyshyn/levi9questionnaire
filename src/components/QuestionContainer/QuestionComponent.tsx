import React, { ChangeEvent } from "react";

import Radio from "@material-ui/core/Radio";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";

import { TaskCategory } from "@constants/configuration";
import {
  StyledQuestionPaper,
  StyledTextContainer,
  StyledCodeContainer,
} from "./styles";
import { UserQuestionView } from "../../types/question";

interface Props {
  question: UserQuestionView;
  onChange: (e: ChangeEvent<any>) => void;
  currentValue?: string | ReadonlyArray<string>;
}

const QuestionComponent: React.FC<Props> = (props) => {
  const { question, onChange, currentValue = '' } = props;
  const { questionText, options, taskType, data } = question;

  return (
    <StyledQuestionPaper elevation={3}>
      <StyledTextContainer>
        <Typography variant="h4" align="center">
          {questionText}
        </Typography>
        {Boolean(data) && <StyledCodeContainer>{data}</StyledCodeContainer>}
      </StyledTextContainer>
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
            <RadioGroup aria-label="question" name="question" value={currentValue} onChange={onChange}>
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
    </StyledQuestionPaper>
  );
};

export default React.memo(QuestionComponent);
