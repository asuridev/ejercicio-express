const {models} = require('../libs/sequelize').sequelize;
const {HttpErrors} = require('../utils/http.errors');

class PublicationService {

  //crear una publicacion
  async create(req){
   const role = await models.Publication.create(req.body);
   return role;
  }

  async findAll(){
    const role = await models.Role.findAll();
    return role;
  }

  async delete(id){
    const role = await this.findById(id);
    role.destroy();
  }


  async findById(id){
    const role = await models.Role.findByPk(id);
    if(!role){
      throw HttpErrors.notFound('Rol no encontrado')
    }
    return role;
  }

}

module.exports = {PublicationService};