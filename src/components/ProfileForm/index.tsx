
import { Props } from './types';
import React, { SyntheticEvent, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Box,
} from "@material-ui/core";

const ProfileForm: React.FC<Props> = ({ profile = {}, onSubmit }) => {

  const [userProfile, setUserProfile] = useState(profile);

  const handleInputChange = (event: SyntheticEvent) => {
    const { name, value } = (event.target as HTMLInputElement);
    setUserProfile({ ...userProfile, ...(name ? { [name]: value } : false) });
  }

  const handleSubmit = () => {
    onSubmit(userProfile);
  }

  return (
    <Container component="main" maxWidth="md">
      <Box p={3}>
        <Paper elevation={3}>
          <Box p={3}>
            <Typography variant="h5" component="h1" gutterBottom>
              Tell us more about yourself
            </Typography>
            <form noValidate>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    value={userProfile?.firstName}
                    onChange={handleInputChange}
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    autoComplete="given-name"
                    aria-label="given-name"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    value={userProfile?.lastName}
                    onChange={handleInputChange}
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    aria-label="family-name"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    value={userProfile?.age}
                    onChange={handleInputChange}
                    variant="outlined"
                    required
                    fullWidth
                    id="age"
                    label="Age"
                    name="age"
                    autoComplete="off"
                    aria-label="age"
                    type="number"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    value={userProfile?.phone}
                    onChange={handleInputChange}
                    variant="outlined"
                    required
                    fullWidth
                    id="phone"
                    label="Phone"
                    name="phone"
                    placeholder="30509834589"
                    autoComplete="tel"
                    aria-label="phone"
                    type="number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={userProfile?.bio}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                    id="bio"
                    label="Short bio"
                    name="bio"
                    autoComplete="off"
                    aria-label="bio"
                    multiline
                    rows={5}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box component="div" display="flex" justifyContent="flex-end">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default ProfileForm;
