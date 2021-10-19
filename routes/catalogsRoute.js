const router = require("express").Router();
const controller = require("../controllers/catalogsController");

// get one detail product
router.get("/:id", controller.getProductDetail);
//get catalogs
router.get("/api", controller.getCatalogs);
// router.get("/api", controller.getProducts);
router.get("/", controller.getAllCatalog);
// router.get("/", controller.getProductPerPage);

module.exports = router;
