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
import SendIcon from '@mui/icons-material/Send';
import { useFetchPublications } from '../hooks/useFetchPublications';
import { Post } from '../components/Post';


const defaultTheme = createTheme();

export  function Home() {
  const [ isError, setError ] = useState(false);
  const [ message, setMessage ] = useState('');
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const {  user } = useGlobalState();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const {isLoading, publications, getPublication } = useFetchPublications();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const onCreate = async(data) =>{
    const config = {
      headers: { Authorization: `Bearer ${user?.token}` }
    };
    try {
      const {data:user} = await axios.post(endpoints.publication, {
        text:data.comment
      },config);
      getPublication();
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
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Hacer Publicaciones
          </Typography>
          <Box
            component="form"
            width="100%"
            onSubmit={handleSubmit(onCreate)}
            noValidate
            sx={{ mt: 1}}
          >
            <Box
              sx={{
                position:'sticky',
                top:0,
                width: "900px",
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                zIndex:1000
              }}
            >
              <TextField
                margin="normal"
                fullWidth
                variant="standard"
                id="textComent"
                label="Comentar Algo"
                sx={{ backgroundColor: "#fff"}}
                {...register("comment", { required: true })}
              />

              <IconButton
                color="primary"
                type="submit"
                sx={{ width: 50, height: 50 }}
              >
                <SendIcon />
              </IconButton>
            </Box>
             {
              !isLoading && (
                publications.map(publication =>(
                  <Post key={publication.id} getPublication={getPublication} publication={publication}/>
                ))
              )
             }
          </Box>
        </Box>

        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={`su publicacion fue creado exitosamente.`}
          action={action}
        />
      </Container>
    </ThemeProvider>
  );
}