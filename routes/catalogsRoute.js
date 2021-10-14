const router = require("express").Router();
const controller = require("../controllers/catalogsController");

// get one detail product
router.get("/:id", controller.getProductDetail);
//get catalogs
router.get("/api", controller.getCatalogs);
router.get("/", controller.getAllCatalog);

module.exports = router;
