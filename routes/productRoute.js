const router = require('express').Router()
const controller = require('../controllers/productController')
const upload = require('../middlewares/uploadImgOfProduct')

// add product
router.post('/', upload.array('images', 12), controller.addProduct)

// edit product
router.put('/:id', upload.array('images', 12) ,controller.editProduct)

// delete product
router.delete('/:id', controller.deleteProduct)

// get one detail product
router.get('/:id', controller.getDetailProduct)

// get all product
router.get('/', controller.getAllProduct)

module.exports = router
