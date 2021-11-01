const router = require('express').Router()
const controller = require('../controllers/newsController');
const upload = require('../middlewares/uploadImgOfUser');

router.get('/',controller.getAllNews);
router.get('/:id',controller.getDetailNews);

router.get('/admin/add-news', controller.getAddNewPage);
router.post('/admin/add-news', upload.single('banner'), controller.addNews)

router.post('/send-mail', controller.sendMail);
module.exports = router