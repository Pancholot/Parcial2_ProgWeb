const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.Correo,
    pass: process.env.Correo_PASS
  }
});


const emailSender = async (mailOptions) => {
    return await transporter.sendMail(mailOptions);
}

module.exports = {emailSender}