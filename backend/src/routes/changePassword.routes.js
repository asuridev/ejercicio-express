const router = require('express').Router();
const passport = require('passport');
const {UserService} = require('../services/users.services');
const { validateSchemaChangePassword } = require('../middleware/schema.handler');
const userService = new UserService();

router.post('/',
 validateSchemaChangePassword(),
 passport.authenticate('jwt',{ session:false }),
  async (req,res,next)=>{
    try {
     const user = await  userService.changePassword(req);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;