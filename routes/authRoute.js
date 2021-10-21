const router = require('express').Router()
const controller = require('../controllers/authController')

// register
router.post('/register',  controller.register)
router.get('/register', controller.getRegister)

// login
router.post('/login', controller.login)
router.get('/login', controller.getLogin)


module.exports = router