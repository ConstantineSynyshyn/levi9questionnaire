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
  margin: 50px auto;
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

export const StyledTextContainer = styled.div`
  margin-bottom: 30px;
`;

export const StyledCodeContainer = styled.pre`
  padding: 16px;
  background-color: lightgray;
  border-radius: 5px;
  font-size: 0.85rem;
  user-select: none;
  tab-size: 2;
  margin: 0 0 16px 0;
`;

export const StyledQuestionPaper = styled(Paper)`
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;