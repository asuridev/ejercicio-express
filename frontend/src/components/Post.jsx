import { Avatar, Box, IconButton, Typography } from '@mui/material';
import { deepOrange, deepPurple } from '@mui/material/colors';
import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InsertCommentIcon from '@mui/icons-material/InsertComment';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import { endpoints } from '../settings/endpoints';
import { useGlobalState } from '../hooks/useGlobalState';
import { useFetchPublications } from '../hooks/useFetchPublications';
import axios from 'axios';



export const Post = ({ publication, getPublication }) => {
  const idPublication = publication.id;
  const idOwner = publication.user.id;

  const {  user } = useGlobalState();
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);
  const [infoModal, setInfoModal] = useState({});
  
  const isOwner = idOwner === user.id;

 const handleInput = ({ target })=>{
  setInput(target.value);
 }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async() =>{
    const config = {
      headers: { Authorization: `Bearer ${user.token}` }
    };
    if(infoModal.action === 'edit'){
      try {
        const {data:user} = await axios.put(endpoints.publication,{
          id:idPublication,
          text:input
        },config);
        getPublication();
        handleClose();
      } catch (error) {
        console.log(error);
      }
    }else if(infoModal.action === 'del'){
      try {
        console.log(idPublication);
        const {data:user} = await axios.delete(`${endpoints.publication}/${idPublication}`,config);
        getPublication();
        handleClose();
      } catch (error) {
        console.log(error);
      }
    }else if(infoModal.action === 'comment'){
      try {
        const {data:user} = await axios.post(endpoints.comment,{
          publicationId:idPublication,
          text:input,
          idOwner:idOwner
        },config);
        getPublication();
        handleClose();
      } catch (error) {
        console.log(error);
      }
    }
  }

  const onEdit = ()=>{
    setInfoModal({
      title: 'Editando Publicacion',
      body:'Reemple su comentario',
      action:'edit'
    });
    handleClickOpen();
  }

  const onDel = ()=>{
    setInfoModal({
      title: 'Eliminando Publicacion',
      body:'Esta seguro Que desea Eliminar Su publicacion',
      action:'del'
    });
    handleClickOpen();
  }

  const onComment = ()=>{
    setInfoModal({
      title: 'Publicando Un comentario',
      body:'Haga un comentario para su amigo',
      action:'comment'
    });
    handleClickOpen();
  }

  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar sx={{ bgcolor: deepPurple[500] }}>
            {publication.user.firstName.split("")[0]}
          </Avatar>
          <Box
            sx={{
              marginLeft: 1,
              border: "1px solid #ccc",
              backgroundColor: "#F5F5F5",
              padding: "16px 16px",
              borderRadius: "24px",
            }}
          >
            <Typography color="primary" component="span" variant="body1">
              {publication.user.firstName} {publication.user.lastName}
            </Typography>
            <Typography marginLeft={2} component="span" variant="body1">
              {publication.text}
            </Typography>
          </Box>
        </Box>
        <Box>
          {isOwner && (
            <>
              <IconButton
                color="primary"
                onClick={onEdit}
                sx={{ width: 50, height: 50 }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="primary"
                onClick={onDel}
                sx={{ width: 50, height: 50 }}
              >
                <DeleteIcon />
              </IconButton>
            </>
          )}
          <IconButton
            onClick={onComment}
            color="primary"
            sx={{ width: 50, height: 50 }}
          >
            <InsertCommentIcon />
          </IconButton>
        </Box>
        {/* continuar comments*/}
        {publication.Comments.length > 0 &&
          publication.Comments.map((comment) => (
            <Box sx={{ display: "flex", alignSelf:'flex-end', marginBottom:1, alignItems: "center" }}>
              <Avatar sx={{ bgcolor: deepPurple[500] }}>
                {comment.commentUser.firstName.split("")[0]}
              </Avatar>
              <Box
                sx={{
                  marginLeft: 1,
                  border: "1px solid #ccc",
                  backgroundColor: "#F5F5F5",
                  padding: "16px 16px",
                  borderRadius: "24px",
                }}
              >
                <Typography color="primary" component="span" variant="body1">
                  {comment.commentUser.firstName} {comment.commentUser.lastName}
                </Typography>
                <Typography marginLeft={2} component="span" variant="body1">
                  {comment.text}
                </Typography>
              </Box>
            </Box>
          ))}
      </Box>

      {/* modal */}
      <Box>
        <Dialog
          fullWidth={true}
          maxWidth="sm"
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>{infoModal.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{infoModal.body}</DialogContentText>
            {infoModal.action !== "del" && (
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Publicacion"
                type="text"
                fullWidth
                value={input}
                onChange={handleInput}
                variant="standard"
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={onSubmit}>Aceptar</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
