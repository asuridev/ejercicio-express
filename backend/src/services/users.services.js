const {models} = require('../libs/sequelize').sequelize;
const {config} = require('../config/config');
const {hash} = require('../utils/hashing');
const {HttpErrors} = require('../utils/http.errors');
const { generateJwt } = require('../utils/jwt');
const {EmailService} = require('./email.services');

const emailService = new EmailService();

class UserService {
  
  async create(req){
   const newUser = req.body
   const usurInDb = await this.findByEmail(newUser.email);
   if(usurInDb){
    throw HttpErrors.conflict('El correo ya está registrado.');
   }
   newUser.password = await hash(newUser.password);
   const user = await models.User.create(newUser);
   delete user.dataValues.password;
   return user;
  }

  async findAll(){
    const users = await models.User.findAll({
      attributes: ['id','email','firstName', 'lastName'],
      //include:{ all: true, nested: true }
      include:[
        {
          association:'publication',
          required:true
        },
        // {
        //   association:'rank',
        //   required:true
        // },
        // {
        //   association:'notes',
        //   required:true,
        //   include:[
        //     {
        //       association:'fault',
        //       required:true
        //     }
        //   ]
        // },
      ]
    });
    return users;
  }

  async update(id,newValues){
    const user = await this.findById(id);
    if(newValues.hasOwnProperty('password')){
      const regExp = new RegExp(config.userPasswordReg);
      if(!regExp.test(newValues.password)){
        throw HttpErrors.badRequest('Formato de contraseña no valida');
      }
      newValues.password = await hash(newValues.password);
    }
    await user.update({
      ...user,
      ...newValues,
    });
    delete user.dataValues.password;
    return user;
  }

  async changePassword(req){
    const id = req.user.sub;
    const newPassword = req.body.password;
    const user = await this.findById(id);
    const password = await hash(newPassword);
    await user.update({
      ...user,
      password
    });
    delete user.dataValues.password;
    return user;
  }


  async delete(id){
    const user = await this.findById(id);
    user.destroy();
  }


  async findById(id){
    const user = await models.User.findOne({
      where:{
        id:id
      },
      attributes:['id','email','firstName', 'lastName'],
      // include:[
      //   {
      //     association:'role',
      //     required:true
      //   },
      //   {
      //     association:'rank',
      //     required:true
      //   },
      //   {
      //     association:'notes',
      //     required:true,
      //     include:[
      //       {
      //         association:'fault',
      //         required:true
      //       }
      //     ]
      //   },
      // ]
    });
    if(!user){
      throw HttpErrors.notFound('Usuario no encontrado')
    }
    return user;
  }

  async findByEmail(email){
    const user = await models.User.findOne({
      where:{
        email:email
      },
      attributes:['id','email','firstName', 'lastName','password'],
      // include:[
      //   {
      //     association:'role',
      //     required:true
      //   },
      //   {
      //     association:'rank',
      //     required:true
      //   },
      // ]
    });
    return user;
  }
  async createPublication(req){
    const userId = req.user.sub;
    const text = req.body.text;
    const comments = await models.Publication.create({
      userId,
      text
    });
  }

  async createComment(req){
    const userId = req.user.sub;
    const text = req.body.text;
    const publicationId = req.body.publicationId;
    const idOwner = req.body.idOwner;

    const userOwnner = await this.findById(idOwner);
    const userComment = await this.findById(userId);

    const message = `
     El usuario ${userComment.email} realizó el comentario:
     <b>"${text}"</b> sobre tu publicacion
    `;
    const comments = await models.Comment.create({
      userId,
      publicationId,
      text
    });
    emailService.send(message,userOwnner.email,'Notificación');
  }

  async getAllPublication(){
    const publications = await models.Publication.findAll({
      // include:{ all: true, nested: true }
      include:[
        {
          association:'user',
          required:true,
          attributes:['id','email','firstName', 'lastName']
        },
        {
          association:'Comments',
          required:false,
          attributes:['id','text', 'createdAt'],
          include:[
            {
              association:'commentUser',
              required:true,
              attributes:['id','email','firstName', 'lastName']
            },
          ]
        }
      ]
    });
    return publications;
  }

  async getPublicationById(id){
    const publication = await models.Publication.findOne({
      where:{
        id:id
      },
    });
    if(!publication){
      throw HttpErrors.conflict('Publicacion No encontrada')
    }
    return publication;
  }

  async deletePublication(req){
    const id = req.params.id;
    const publication = await this.getPublicationById(id);
    await publication.destroy();
  }

  async editPublication(req){
    const id = req.body.id;
    const text = req.body.text;
    const publication = await this.getPublicationById(id);
    await publication.update({
      ...publication,
      text
    });
  }

  async sendEmailRecoveryPassword(req){
    const email  = req.body.email;
    const user = await this.findByEmail(email);
    if(!user){
      throw HttpErrors.notFound('Usuario No registrado')
    }
    const token = generateJwt(user);
    const urlRecovery = `${config.serverDomain}:${config.frontPort}/changePassword?token=${token}`;
    console.log(urlRecovery);
    emailService.send(urlRecovery, email);
  }
}

module.exports = {UserService};