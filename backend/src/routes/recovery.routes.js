const router = require('express').Router();
const { validateSchemRecovery } = require('../middleware/schema.handler');
const {UserService} =  require('../services/users.services')
const userService = new UserService();

router.post('/',
  validateSchemRecovery(),
  async (req,res,next)=>{
    try {
      await userService.sendEmailRecoveryPassword(req);
      res.status(201).json();
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;