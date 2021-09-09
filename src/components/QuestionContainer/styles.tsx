import styled from "styled-components";

import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

export const StyledPaper = styled(Paper)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;

export const StyledQuestionBox = styled(Box)`
  width: 650px;
  display: flex;
  flex-direction: column;
  margin: 150px auto;
`;

export const StyledQuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

export const StyledQuestionFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
`;

export const StyledTimerContainer = styled.div`
  width: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledQuestionContainer = styled.div``;
