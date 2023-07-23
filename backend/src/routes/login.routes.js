const router = require('express').Router();
const passport = require('passport');
const { validateSchemaLogin } = require('../middleware/schema.handler');

router.post('/',
  validateSchemaLogin(),
 passport.authenticate('local',{session:false}),
  async (req,res,next)=>{
    try {
      res.status(201).json(req.user);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;