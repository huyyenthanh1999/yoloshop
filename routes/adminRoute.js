const router = require('express').Router()
const controller =  require('../controllers/adminController')
const {checkAdmin} = require('../middlewares/checkAdmin')

router.use(checkAdmin)

// render dashboard
router.get('/', controller.adminDashboard)

// render products
router.get('/products', controller.adminProducts)


// add product
router.get('/add-product', controller.adminAddProduct)

// see and edit product
router.get('/products/:id', controller.adminEditProduct)

// router.get('/products/:id', controller.adminEditProductCode)

// customers
router.get('/customers', controller.adminCustomers)


// see and edit product
router.get('/customers/:id', controller.adminEditCustomer)



// order
router.get('/orders', controller.adminOrder)
// router.get('/orders/:id', controller.adminDetailOrder)


// sales



// account
router.get('/account', controller.adminAccount)



// setting




module.exports = router