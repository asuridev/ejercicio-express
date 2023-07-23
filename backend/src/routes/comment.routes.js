const router = require('express').Router();
const passport = require('passport');
const {UserService} = require('../services/users.services');
const userService = new UserService();

router.post('/',
  passport.authenticate('jwt',{ session:false }),
  async (req,res,next)=>{
    console.log("*******************>>>>>>>>>>>>>>>*********",req.body);
    try {
     const user = await  userService.createComment(req);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;