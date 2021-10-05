const router = require("express").Router();
const controller = require("../controllers/catalogsController");

// get one detail product
router.get("/:id", controller.getProductDetail);
//get catalogs
router.get("/", controller.getCatalogs);

module.exports = router;
