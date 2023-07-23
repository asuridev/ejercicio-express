const  {HttpErrors} = require('../utils/http.errors');
const {checkSchema} = require('express-validator')


const validateSchemaNewUser = ()=>{
  return async (req, res, next) =>{
    const  results = await checkSchema({
      firstName: { isString: true, optional:false },
      lastName:{ isString: true, optional:false  },
      email:{ isString: true, optional:false  },
      password:{ isString: true, optional:false  },
    }).run(req);
    const isValidated = results.every(result => result.isEmpty());
    if (!isValidated) {
      next(HttpErrors.badRequest('bad formated request'));
    }else{
      next();
    }
  }
}
const validateSchemaLogin = ()=>{
  return async (req, res, next) =>{
    const  results = await checkSchema({
      username: { isString: true, optional:false },
      password:{ isString: true, optional:false  },
    }).run(req);
    const isValidated = results.every(result => result.isEmpty());
    if (!isValidated) {
      next(HttpErrors.badRequest('bad formated request'));
    }else{
      next();
    }
  }
}

const validateSchemRecovery = ()=>{
  return async (req, res, next) =>{
    const  results = await checkSchema({
      email: { isString: true, optional:false },
    }).run(req);
    const isValidated = results.every(result => result.isEmpty());
    if (!isValidated) {
      next(HttpErrors.badRequest('bad formated request'));
    }else{
      next();
    }
  }
}

const validateSchemaChangePassword = ()=>{
  return async (req, res, next) =>{
    const  results = await checkSchema({
      password: { isString: true, optional:false },
    }).run(req);
    const isValidated = results.every(result => result.isEmpty());
    if (!isValidated) {
      next(HttpErrors.badRequest('bad formated request'));
    }else{
      next();
    }
  }
}

module.exports = {
  validateSchemaNewUser,
  validateSchemaLogin,
  validateSchemRecovery,
  validateSchemaChangePassword
}