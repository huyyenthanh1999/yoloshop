const router = require('express').Router()
const controller =  require('../controllers/adminController')

// render dashboard
router.get('/', controller.adminDashboard)

// render products
router.get('/products', controller.adminProducts)


// add product
router.get('/add-product', controller.adminAddProduct)

// see and edit product
router.get('/products/:id', controller.adminEditProduct)


// customers
router.get('/customers', controller.adminCustomer)


// see and edit product
router.get('/customers/:id', controller.adminEditCustomer)



// order
router.get('/orders', controller.adminOrder)


// sales



// account



// setting




module.exports = router