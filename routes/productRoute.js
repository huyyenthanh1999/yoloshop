const router = require('express').Router()
const controller = require('../controllers/productController')
const upload = require('../middlewares/uploadImgOfProduct')

// add product
router.post('/api', upload.array('images', 12), controller.addProduct)

// edit product
router.put('/api/:id', upload.array('images', 12) ,controller.editProduct)

// delete product
router.delete('/api/:id', controller.deleteProduct)

// delete product code
router.delete('/code/api/:id', controller.deleteProductCode)


// get all product
router.get('/api', controller.getAllProduct)

// get one detail product
router.get('/api/:id', controller.getDetailProduct)



router.get('/add/:id', controller.userAddProduct)

module.exports = router