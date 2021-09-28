const router = require('express').Router()
const controller = require('../controllers/userController')
const upload = require('../middlewares/uploadImgOfUser')

// register/ add user
router.post('/register', upload.single('avatar'), controller.register)

// login
// a trung thanh

// edit user
router.put('/:id', upload.single('avatar'), controller.editUser)

// delete user
router.delete('/:id', controller.deleteUser)

// get detail user
router.get('/:id', controller.getDetailUser)

// get all user
router.get('/', controller.getAllUser)

module.exports = router
