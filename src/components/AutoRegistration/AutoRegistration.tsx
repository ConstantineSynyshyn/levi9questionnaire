import React from "react";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

interface Props {
  email: string;
  error?: string
  success?: string
}

const AutoRegistration: React.FC<Props> = ({ email, error }) => {
  if (error) {
    return (
      <Box component="div" p={2}>
        <Typography variant="h4" color="error" gutterBottom>
          {error}
        </Typography>
      </Box>
    );
  }
  return (
    <Box component="div" p={2}>
      <Typography variant="h4" color="textPrimary" gutterBottom>
        Activation email have been sent on {email}. Please confirm it
      </Typography>
    </Box>
  );
};

export default AutoRegistration;
