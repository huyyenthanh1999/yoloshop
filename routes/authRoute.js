const router = require('express').Router()
const controller = require('../controllers/authController')
// const upload = require('../middlewares/uploadImgOfUser');
// const userModel = require('../models/userModel');

// register
// router.post('/register',  controller.register)
// router.get('/register', controller.getRegister)

// login
router.post('/login', controller.login)
router.get('/login', controller.getLogin)