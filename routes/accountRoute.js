const router = require('express').Router()
const controller = require('../controllers/accountController')

//get account page
router.get('/' ,controller.getAccount );

router.put('/edit-account',controller.editAccount );

module.exports = router