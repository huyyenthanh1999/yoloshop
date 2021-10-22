const router = require("express").Router();
const controller = require("../controllers/homeController");

router.get('/', controller.getAllData)

//exports
module.exports = router;
