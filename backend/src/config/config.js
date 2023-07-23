require('dotenv').config()

const config = {
  serverPort : process.env.SERVER_PORT || 3000,
  serverDomain:process.env.SERVER_DOMAIN,
  frontPort:process.env.PORT_FRONT,
  dbDialect:process.env.DB_DIALECT,
  secretEmail:process.env.SECRET_EMAIL,
  cuentaEmail:process.env.CUENTA_EMAIL,
  dbHost:process.env.DB_HOST,
  dbPort:process.env.DB_PORT,
  dbUser:process.env.DB_USER,
  dbPassword:process.env.DB_PASSWORD,
  dbName:process.env.DB_NAME,
  userPasswordReg:process.env.USER_PASSWORD_REG,
  jwtKey:process.env.JWT_KEY
}

module.exports = {config}