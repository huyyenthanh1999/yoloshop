const router = require("express").Router();
const controller = require("../controllers/catalogsController");

// get one detail product
router.get("/detail/:id", controller.getProductDetail);
//get catalogs
router.get("/api", controller.getCatalogs);
//get filter product
// router.get("/filter",controller.getCustomProduct)
// router.get("/api", controller.getProducts);
// router.get("/", controller.getAllCatalog);
//custom product huy_dawn
router.get('/', controller.getFilter)
router.post('/', controller.renderProduct)

// router.get("/:page", controller.getAllCatalog);
// router.get("/", controller.getProductPerPage);

router.post('/detail/:id',controller.getVariantTotal);
router.post('/detail',controller.getAllInfoProduct)

//add cart
router.put('/add',controller.addToCart)

module.exports = router;
