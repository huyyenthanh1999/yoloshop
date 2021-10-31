const router = require('express').Router()
const controller = require('../controllers/newsController')

router.get('/',controller.getAllNews)
router.get('/:id',controller.getDetailNews)

router.get('/add-news', controller.getAddNewPage)
module.exports = router