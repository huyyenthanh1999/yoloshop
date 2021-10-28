const router = require('express').Router()
const controller = require('../controllers/newsController')

router.get('/',controller.getAllNews)
router.get('/:id',controller.getDetailNews)

module.exports = router