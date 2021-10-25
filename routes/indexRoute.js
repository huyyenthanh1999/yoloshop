const router = require("express").Router();
const controller = require("../controllers/homeController");

router.get('/', controller.getAllData)
router.post('/', controller.getSearchData)

//exports
module.exports = router;
