const {UniqueConstraintError,ValidationError} =  require('sequelize');
const {ControlledError} = require('../utils/http.errors');

const logErrors = (err,req,res,next)=>{
  console.log(err);
  next(err);
};

const conrolledErrors = (err,req,res,next)=>{
  if(err instanceof ControlledError){
    res.status(err.statusCode).json({
      statusCode:err.statusCode,
      message:err.message
    });
  }else{
    next(err);
  }
};

const duplicateFieldErrors = (err,req,res,next)=>{
  if(err instanceof UniqueConstraintError){
    res.status(409).json({
      statusCode:409,
      message:err.errors[0].message
    });
  }else{
    next(err);
  }
};

const validationsErrors = (err,req,res,next)=>{
  if(err instanceof ValidationError){
    res.status(400).json({
      statusCode:400,
      message:'bad request'
    });
  }else{
    next(err);
  }
};

const serverErrors = (err,req,res,next)=>{
  res.status(500).json({
    statusCode:500,
    message:err.message
  });
};


module.exports = {
  logErrors,
  conrolledErrors,
  duplicateFieldErrors,
  validationsErrors,
  serverErrors
}