const express = require('express');
const router = express.Router();
const { mandarMail, getForms } = require('../controllers/formsControllers');

router.route('/')
    .get(getForms)
    .post(mandarMail);

module.exports = router;
