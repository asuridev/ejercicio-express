const {userSchema,User} = require('./user.model');
const {publicationSchema,Publication} = require('./publication.model');
const {commentSchema, Comment} = require('./comment.model');


const setUpModels = (sequelize)=>{
  User.init(userSchema,User.config(sequelize));
  Publication.init(publicationSchema,Publication.config(sequelize));
  Comment.init(commentSchema,Comment.config(sequelize));
  

  //relations Users > Publication FK:user_id
  User.hasMany(Publication,{
    foreignKey:{
      name:'userId',
      field:'user_id',
      allowNull: false
    }
  });
  Publication.belongsTo(User,{foreignKey:'userId', as:'user'});

  //relations Publication > Comments  FK:publication_id
  Publication.hasMany(Comment,{
      foreignKey:{
        name:'publicationId',
        field:'publication_id',
        allowNull: false,
      }
    });
  Comment.belongsTo(Publication,{foreignKey:'publicationId'});
  

//relations Users > Comment FK:user_id
  User.hasMany(Comment,{
    foreignKey:{
      name:'userId',
      field:'user_id',
      allowNull: false
    }
  });
  Comment.belongsTo(User,{foreignKey:'userId', as:'commentUser'});

}

module.exports = {setUpModels};