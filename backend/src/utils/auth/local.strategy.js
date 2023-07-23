const {Strategy} = require('passport-local');
const {HttpErrors} = require('../http.errors');
const {validateHash} = require('../hashing');
const {generateJwt} = require('../jwt');
const {UserService} = require('../../services/users.services');
const userService = new UserService();

const localStrategy = new Strategy(
  async (email,password,done)=>{
    try {
      const user = await userService.findByEmail(email);
      if(!user){
        done(HttpErrors.unauthorized('El usuario no existe'),false);
      }
      const isMatchPassword = await validateHash(password,user.password);
      if(!isMatchPassword){
        done(HttpErrors.unauthorized('Usuario o contraseña erroneas'),false);
      }
      const token = generateJwt(user);
      user.dataValues.token = token;
      delete user.dataValues.password;
      done(null,user);
    } catch (error) {
      done(error,false);
    }
  }
);

module.exports = {localStrategy};