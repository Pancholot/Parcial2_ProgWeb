const express = require('express');
const router = express.Router();
const { mandarMail, getForms } = require('../controllers/formsControllers');

router.post('/', mandarMail);

module.exports = router;
