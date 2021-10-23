const router = require('express').Router()
const controller = require('../controllers/authController')
const upload = require('../middlewares/uploadImgOfUser')
const {checkUser} = require('../middlewares/checkUser')

// register
router.post('/register', upload.none(), controller.register)
router.get('/register', checkUser ,controller.getRegister)

// login
router.post('/login', controller.login)
router.get('/login', checkUser ,controller.getLogin)

module.exports = router
