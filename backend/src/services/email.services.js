const nodemailer = require("nodemailer");
const { HttpErrors } = require("../utils/http.errors");
const { config } = require("../config/config");


class EmailService{
   transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: `${config.cuentaEmail}`,
      pass: `${config.secretEmail}`
    }
  });
 
  async send(message,email,subject='Recovery'){
    try {
      const info = await this.transporter.sendMail({
        from: '"Prueba Tecnica Antonio Suarez" <antoniosuarezrincon@gmail.com>', 
        to: email, 
        subject: `${subject} ✔`, 
        html: `${message}`, 
      });
      return true;
    } catch (error) {
      throw HttpErrors.conflict('No fue Posible enviar el Correo.')
    }
  }
}

module.exports = {
  EmailService
}