
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
import { useForm, Controller } from "react-hook-form";
import { Profile } from '../../types';


const ProfileForm: React.FC<Props> = ({ profile, onSubmit }) => {

  const [userProfile, setUserProfile] = useState(profile);

  const { control, handleSubmit, formState: { errors } } = useForm<Partial<Profile>>();

  const handleInputChange = (event: SyntheticEvent) => {
    const { name, value } = (event.target as HTMLInputElement);
    setUserProfile({ ...userProfile, ...(name ? { [name]: value } : false) });
  }

  const handleFormSubmit = (data: Partial<Profile>) => {
    onSubmit(data);
  }

  return (
    <Container component="main" maxWidth="md">
      <Box p={3}>
        <Paper elevation={3}>
          <Box p={3}>
            <Typography variant="h5" component="h1" gutterBottom>
              {profile ? 'Edit profile' : 'Tell us more about yourself'}
            </Typography><br />
            <form noValidate onSubmit={handleSubmit(handleFormSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="firstName"
                    control={control}
                    defaultValue={userProfile?.firstName}
                    rules={{ required: { value: true, message: 'Required field' }, maxLength: { value: 50, message: "Max length is 50" } }}
                    render={({ field }) => {
                      return <div>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="firstName"
                          label="First Name"
                          autoComplete="given-name"
                          aria-label="first name"
                          helperText={errors.firstName?.message}
                          error={!!(errors?.firstName)}
                          {...field}
                        />
                      </div>
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="lastName"
                    control={control}
                    defaultValue={userProfile?.lastName}
                    rules={{ required: { value: true, message: 'Required field' }, maxLength: { value: 50, message: "Max length is 50" } }}
                    render={({ field }) => {
                      return <div>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="lastName"
                          label="Last Name"
                          autoComplete="family-name"
                          aria-label="last name"
                          helperText={errors.lastName?.message}
                          error={!!(errors?.lastName)}
                          {...field}
                        />
                      </div>
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="age"
                    control={control}
                    defaultValue={userProfile?.age}
                    rules={{ required: { value: true, message: 'Required field' }, pattern: { value: /^(1[89]|[2-9][0-9])$/, message: "Age in range 18-99" } }}
                    render={({ field }) => {
                      return <div>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="age"
                          label="Age"
                          type="number"
                          autoComplete="off"
                          aria-label="age"
                          helperText={errors.age?.message}
                          error={!!(errors?.age)}
                          {...field}
                        />
                      </div>
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="phone"
                    control={control}
                    defaultValue={userProfile?.phone}
                    rules={{ required: { value: true, message: 'Required field' }, pattern: { value: /^(380\d{9})$/, message: "Phone number format 380501234567" } }}
                    render={({ field }) => {
                      return <div>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="phone"
                          label="Phone"
                          autoComplete="tel"
                          aria-label="phone"
                          helperText={errors.phone?.message}
                          error={!!(errors?.phone)}
                          {...field}
                        />
                      </div>
                    }}
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
                      type="submit"
                    >
                      {profile ? 'Save' : 'Submit'}
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
