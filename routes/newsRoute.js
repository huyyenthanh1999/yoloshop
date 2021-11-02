const router = require('express').Router()
const controller = require('../controllers/newsController');
const upload = require('../middlewares/uploadImgOfUser');

router.get('/:page',controller.getAllNews);
router.get('/',controller.getAllNews);

router.get('/detail/:slug',controller.getDetailNews);

router.get('/admin/news/:page', controller.getNews);
router.get('/admin/news/', controller.getNews);

router.get('/admin/add-news', controller.getAddNewPage);
router.get('/admin/all-news/:page', controller.getAllNews);
router.post('/admin/add-news', upload.single('banner'), controller.addNews);

router.get('/admin/edit-news/:slug', controller.getEditNews);
router.put('/admin/edit-news/', upload.single('banner'), controller.editNews)

router.delete('/admin/delete-news/:id', controller.deleteNews)

router.post('/send-mail', controller.sendMail);
module.exports = router