const router = require('express').Router();
const passport = require('passport');
const {UserService} =  require('../services/users.services')
const userService = new UserService();

const {PublicationService} = require('../services/publications.services');
const publicationService = new PublicationService();

//crear una publicacion
router.post('/',
  passport.authenticate('jwt',{ session:false }),
  async (req,res,next)=>{
    try {
      const comment = await userService.createPublication(req);
      res.status(201).json(comment);
    } catch (error) {
      next(error);
    }
  }
);

//obtener todos las publicaciones
router.get('/',
  passport.authenticate('jwt',{ session:false }),
  async (req,res,next)=>{
    try {
      const publications = await userService.getAllPublication();
      res.status(200).json(publications);
    } catch (error) {
      next(error);
    }
  }
);

router.put('/',
  passport.authenticate('jwt',{ session:false }),
  async (req,res,next)=>{
    try {
      const publication = await userService.editPublication(req);
      res.status(201).json(publication);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  passport.authenticate('jwt',{ session:false }),
  async (req,res,next)=>{
    try {
      const publication = await userService.deletePublication(req);
      res.status(201).json(publication);
    } catch (error) {
      next(error);
    }
  }
);




module.exports = router;