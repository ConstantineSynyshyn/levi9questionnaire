import React from "react";

import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import FileUploadButton from "./FileUploadButton";

const Upload: React.FC = () => {
  return (
    <Paper elevation={3}>
      <Box p={2}>
        <Typography variant="h5">
          Press the button and choose file with questions
        </Typography>
        <FileUploadButton />
      </Box>
    </Paper>
  );
};

export default Upload;
