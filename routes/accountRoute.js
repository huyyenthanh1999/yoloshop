const router = require('express').Router()
const controller = require('../controllers/accountController')

//get account page
router.get('/', controller.getAccount)

router.get('/invoices/:id', controller.getDetailBill)

router.put('/edit-info', controller.editInfoAccount)

router.put('/edit-pass', controller.editPasswordAccount)

module.exports = router
