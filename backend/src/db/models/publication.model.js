const {Model,DataTypes,Sequelize} = require('sequelize');
const PUBLICATION_TABLE = 'publications';

const publicationSchema = {
  id:{
    allowNull:false,
    primaryKey:true,
    autoIncrement: true,
    type:DataTypes.BIGINT(20)
  },
  text:{
    allowNull:false,
    type:DataTypes.TEXT,
    validate:{
      notEmpty:true,
    }
  },
}
 
class Publication extends Model {

  static config(sequelize){
    return {
      sequelize,
      tableName:PUBLICATION_TABLE,
      modelName: 'Publication',
      timestamps:true
    }
  }
}

module.exports = {
  publicationSchema,
  Publication,
  PUBLICATION_TABLE
}