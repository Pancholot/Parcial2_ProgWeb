const asyncHandler = require('express-async-handler');
const Forms = require('../models/formsModel');
const {emailSender} = require('../config/email')


const getForms = asyncHandler(async (req, res) => {
    const forms = await Forms.find();
    res.status(200).json(forms);
});

const mandarMail = asyncHandler(async (req, res) => {
    const { form } = req.body;
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail(form.mail)) {
      return res.status(400).json({ error: 'Correo electrónico inválido' });
    }
  
    const mailOptions = {
      from: process.env.Correo,
      to: process.env.Correo,
      subject: `Duda de ${form.nombre}`,
      text: `${form.asunto}\nPor parte de: ${form.mail}`
    };
  
    try {
      const info = await emailSender(mailOptions);

      const nuevoForm = await Forms.create(form);
  
      res.status(200).json({
        message: 'Correo enviado y formulario guardado',
        id: info.messageId,
        saved: nuevoForm
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al enviar el correo o guardar el formulario', details: error.message });
    }
  });
  
module.exports = {getForms, mandarMail};
