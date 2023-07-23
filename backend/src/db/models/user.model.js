const {Model,DataTypes,Sequelize} = require('sequelize');
const USER_TABLE = 'users';

const userSchema = {
  id:{
    allowNull:false,
    primaryKey:true,
    autoIncrement: true,
    type:DataTypes.BIGINT(20)
  },
  email:{
    allowNull:false,
    unique:true,
    type:DataTypes.STRING,
    validate:{
      notEmpty:true,
      len: [6,100],
      isEmail: true, 
    }
  },
  password:{
    allowNull:false,
    type:DataTypes.STRING,
    validate:{
      notEmpty:true,
    }
  },
  firstName:{
    allowNull:false,
    field:'first_name',
    type:DataTypes.STRING,
    validate:{
      notEmpty:true,
      len: [2,30],
      is: /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/
    }
  },
  lastName:{
    allowNull:false,
    field:'last_name',
    type:DataTypes.STRING,
    validate:{
      notEmpty:true,
      len: [2,30],
      is: /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/
    }
  }
};

class User extends Model {
 
  static config(sequelize){
    return {
      sequelize,
      tableName:USER_TABLE,
      modelName: 'User'
    }
  }
}

module.exports = {
  userSchema,
  User,
  USER_TABLE
}