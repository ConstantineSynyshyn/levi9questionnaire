import React, { ReactChild } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import styled from "styled-components";
import {
  AppBar,
  Button,
  Container,
  Paper,
  TextField,
  Toolbar,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

const StyledImageContainer = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
`;

const StyledQuestionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 25px;
  padding: 25px;
`;

const Home: NextPage = () => {
  const [code, setCode] = React.useState("");

  const submitCodeHandler = () => {
    fetch(`/api/js`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(code),
    });
  };

  const onTextFieldChangeHandler = (e, val) => {
    console.log(e, val);
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <StyledImageContainer>
            <Image src="/levi9-logo.jpg" alt="Levi9-logo" layout="fill" />
          </StyledImageContainer>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Paper elevation={0}>
          <StyledQuestionWrapper>
            <TextField
              id="outlined-multiline-static"
              label="Enter your solution"
              multiline
              rows={4}
              defaultValue="function myFunc() {}"
              variant="outlined"
              onChange={onTextFieldChangeHandler}
            />
            <Button
              variant="contained"
              color="primary"
              endIcon={<SaveIcon />}
              onClick={submitCodeHandler}
            >
              Submit
            </Button>
          </StyledQuestionWrapper>
        </Paper>
      </Container>
    </>
  );
};

export default Home;
