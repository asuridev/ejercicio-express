const {HttpErrors} = require('../utils/http.errors');

const validateRole = (...roles)=>{
  return (req,res,next)=>{
    const payload = req.user;
    if(roles.includes(payload.role)){
      next();
    }else{
      next(HttpErrors.unauthorized("No tine permisos"));
    }
  };
};

module.exports = {
  validateRole
};