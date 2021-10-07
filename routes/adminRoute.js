const router = require('express').Router()
const controller =  require('../controllers/adminController')

// dashboard
router.get('/', controller.adminDashboard)
router.get('/adminDashboardData', controller.adminDashboardData)


// products
router.get('/products', (req, res) => {
    res.render('components/admin/admin-base', {
        content: 'products'
    })
})


// add product
router.get('/add-product', (req, res) => {
    res.render('components/admin/admin-base', {
        content: 'add-product',
    })
})

// see and edit product
router.get('/products/:id', controller.adminEditProduct)


// customers


// order


// sales



// account



// setting




module.exports = router