const jwt = require('jsonwebtoken');
const {config} = require('../config/config')

const generateJwt = (user)=>{
  const payload = {
    sub:user.id,
  }
  return jwt.sign(payload,config.jwtKey,{expiresIn:'45min'});
};

module.exports = {
  generateJwt
};