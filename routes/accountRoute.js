const router = require('express').Router()

//get account page
router.get('/', (req, res) => {
    res.render('pages/account')
})

module.exports = router