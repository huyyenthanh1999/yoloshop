const router = require("express").Router();
const controller = require("../controllers/catalogsController");

// get one detail product
router.get("/detail/:id", controller.getProductDetail);
//get catalogs
router.get("/api", controller.getCatalogs);
//get filter product
router.get("/filter",controller.getCustomProduct)
// router.get("/api", controller.getProducts);
router.get("/", controller.getAllCatalog);
router.get("/:page", controller.getAllCatalog);
// router.get("/", controller.getProductPerPage);

module.exports = router;
