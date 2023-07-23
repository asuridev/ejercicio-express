import  React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { endpoints } from '../settings/endpoints';
import { Alert } from '@mui/material';
import {useNavigate} from 'react-router-dom'
import { useGlobalState } from '../hooks/useGlobalState';

const defaultTheme = createTheme();

export  function Register() {
  const [ isError, setError ] = useState(false);
  const [ message, setMessage ] = useState('');
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { login } = useGlobalState();

  const onSubmit = async(data) =>{
    try {
      const { data:user } = await axios.post(endpoints.users, data);
      setError(false);
      navigate('/login');
    } catch (error) {
      setError(true);
      setMessage(error.response.data.message);
    }
  }
 

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
           Registro
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  {...register('firstName',{ required: true})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  autoComplete="family-name"
                  {...register('lastName',{ required: true})}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  {...register('email',{ required: true})}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  {...register('password',{ required: true})}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                {
                  isError && (
                    <Alert severity="error">{ message }</Alert>
                  )
                }
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrar
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link sx={{cursor:'pointer'}} onClick={()=>navigate('/login')} variant="body2">
                  Ya tienes una cuenta? Ingresar
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}