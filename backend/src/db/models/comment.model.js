const {Model,DataTypes,Sequelize} = require('sequelize');
const COMMENT_TABLE = 'comments';

const commentSchema = {
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
 

class Comment extends Model {

  static config(sequelize){
    return {
      sequelize,
      tableName:COMMENT_TABLE,
      modelName: 'Comment',
      timestamps:true
    }
  }
}

module.exports = {
  commentSchema,
  Comment,
  COMMENT_TABLE
}