var express = require('express');
var router = express.Router();


const { processRegister, processLogin } = require('../controllers/authController')
/* GET users listing. */

router.post('/register',processRegister);
router.post('/login',processLogin);

module.exports = router;
