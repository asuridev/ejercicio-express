const router = require('express').Router();
const loginRouter = require('./login.routes');
const usersRouter = require('./users.routes');
const publicationRouter = require('./publication.routes');
const recoveryRouter = require('./recovery.routes');
const changePasswordRouter = require('./changePassword.routes');
const commentdRouter = require('./comment.routes');
// const ranksRouter = require('./ranks.routes');
// const notesRouter = require('./notes.routes');
// const faultsRouter = require('./faults.routes');


const controller = (app)=>{
  app.use('/api/v1',router);
  router.use('/login',loginRouter);
  router.use('/users',usersRouter);
  router.use('/publication',publicationRouter);
  router.use('/recovery',recoveryRouter);
  router.use('/changePassword',changePasswordRouter);
  router.use('/comment',commentdRouter);
} 

module.exports = {controller};