import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { endpoints } from '../settings/endpoints';
import { Alert, IconButton, Snackbar } from '@mui/material';
import { useGlobalState } from '../hooks/useGlobalState';
import CloseIcon from '@mui/icons-material/Close';
import {useSearchParams} from 'react-router-dom'


const defaultTheme = createTheme();

export  function ChangePassword() {
  const [ isError, setError ] = useState(false);
  const [ message, setMessage ] = useState('');
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const {login} = useGlobalState();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  console.log(token);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const onSubmit = async(data) =>{
    const {newPassword, ConfirmPassword} = data;
    if(newPassword !== ConfirmPassword ){
      setMessage('las contraseñas No coinciden');
      setError(true);
      return
    }
    try {
      const {data:user} = await axios.post(endpoints.changePassword,{
        password:newPassword
      },config);
      navigate('/login');
    } catch (error) {
      setMessage(error.response.data.message || error.response.data);
      setError(true);
    }
  }


  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

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
            Ingrese Un Nuevo Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              type="password"
              id="newPassword"
              label="Nuevo Password"
              autoFocus
              {...register('newPassword',{ required: true})}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Confirmar Password"
              type="password"
              id="password"
              {...register('ConfirmPassword',{ required: true})}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cambiar
            </Button>
            <Grid container>
            <Grid item xs={12}>
                {
                  isError && (
                    <Alert severity="error">{ message }</Alert>
                  )
                }
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={`Hemos enviado un correo a ${email} para recuperar su contaseña`}
        action={action}
      />
      </Container>
    </ThemeProvider>
  );
}