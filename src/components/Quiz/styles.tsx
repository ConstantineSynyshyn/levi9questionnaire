import styled from "styled-components";

import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

export const StyledPaper = styled(Paper)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;

export const StyledQuizBox = styled(Box)`
  width: 650px;
  display: flex;
  flex-direction: column;
`;

export const StyledQuizHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

export const StyledQuizFooter = styled.div`
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

export const StyledQuizContainer = styled.div`
  width: 100%;
  height: 100%;
`;
