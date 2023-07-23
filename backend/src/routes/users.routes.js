const router = require('express').Router();
const passport = require('passport');
const {validateRole} = require('../middleware/authorization.handler');
const {UserService} = require('../services/users.services');
const { validateSchemaNewUser } = require('../middleware/schema.handler');
const userService = new UserService();

//crear un usuario
router.post('/',
  validateSchemaNewUser(),
  async (req,res,next)=>{
    try {
      const user = await userService.create(req);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);

//obtener todos los usuarios
router.get('/',
  
  async (req,res,next)=>{
    try {
      const users = await userService.findAll();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
);

//obtener usuario por id
router.get('/:id',

  async (req,res,next)=>{
    const { id } = req.params;
    try {
      const user = await userService.findById(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

//Actualizar usuario
router.put('/:id',

  async (req,res,next)=>{
    const {id} =  req.params;
    try {
      const user = await userService.update(id,req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);

//eliminar usuario
router.delete('/:id',

  async (req,res,next)=>{
    const {id} =  req.params;
    try {
      const user = await userService.delete(id);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;