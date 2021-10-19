const Product = require("../models/productModel");
const ProductCode = require("../models/productCodeModel");
const { render } = require("ejs");
module.exports.getProductDetail = async (req, res) => {
  const idProductCode = req.params.id;
  try {
    const productCode = await ProductCode.findById(idProductCode);
    const products = await Product.find({
      idProductCode: idProductCode,
    });
    var sizes = products.map(e => e.size);
    var colors = products.map(e => e.color);
    //get all product
    const allProductCodes = await ProductCode.find();
    const arr = Array.from(Array(allProductCodes.length).keys());
    var moreIndexes = getRandom(arr, 8);
    function getRandom(arr, n) {
      var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
      if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
      while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
      }
      return result;
    }
    res.render("pages/product_detail",{
      moreIndexes,
      products: allProductCodes,
      product: productCode, 
      sizes: [...new Set(sizes)],
      colors: [...new Set(colors)],
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Lỗi server",
    });
  }
};
// module.exports.getsp = async (req, res) => {
//   console.log(req.query);
// };
module.exports.getCatalogs = async (req, res) => {
  var arrType = req.query.type;
  var arrColor = req.query.color;
  var arrSize = req.query.size;
  console.log(arrSize);
  if (arrSize[0] === "") {
    arrSize = ["s", "m", "l", "xl"];
  }
  if (arrColor[0] === "") {
    arrColor = ["red", "white", "blue", "orange"];
  }
  if (arrType[0] === "") {
    arrType = ["ao-somi", "ao-thun", "quan-jean"];
  }
  try {
    
    const typeProduct = await ProductCode.find({
      type: { $in: arrType },
    });

    const idCode = typeProduct.map((product) => {
      return product.id;
    });
    const products = await Product.find({
      idProductCode: { $in: idCode },
      color: { $in: arrColor },
      size: { $in: arrSize },
    });
    // console.log(products);
    const listId = products.map((product) => {
      return product.idProductCode;
    });
    // console.log(listId);
    const fnFilter = (arr) => {
      return Array.from(new Set(arr));
    };
    const arrId = fnFilter(listId);

    const catalogProduct = await ProductCode.find({
      _id: { $in: arrId },
    });

    res.status(200).json({
      status: "success",
      data: {
        catalogProduct,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Lỗi loongf",
    });
  }
};

// module.exports.getProducts = async (req, res) => {
//   try {
//     console.log(req)
//     // const products = await Product.find({idProductCode: '615d2755a4bb5cf7be279ca4' ,size: ["M", "S"],color: { $in: ["yellow"]}})
//     const products = [1,2,3]
//     res.send({
//       data:products
//     })
//   } catch (error) {
//     res.status(500).json({
//       status: "fail",
//       message: "Lỗi server",
//     });
//   }
// }

module.exports.getAllCatalog = async (req, res) => {
  //get type, size and color from query
  var arrType = JSON.parse(req.query.type)
  var arrColor = JSON.parse(req.query.color)
  var arrSize = JSON.parse(req.query.size)
  try {
    //get all type
    const productCodes = await ProductCode.find();
    const types = [];
    productCodes.forEach(productCode => {
      types.push(productCode.type)
    })
    var uniqueTypes = types.filter((type, index) => {
      return types.indexOf(type) === index;
    });

    //get all color
    const products = await Product.find();
    const colors = [];
    products.forEach(product => {
      colors.push(product.color)
    })
    var uniqueColors = colors.filter((color, index) => {
      return colors.indexOf(color) === index;
    });

    //get all size
    const sizes = []
    products.forEach(product => {
      sizes.push(product.size)
    })
    var uniqueSizes = sizes.filter((size, index) => {
      return sizes.indexOf(size) === index;
    });

    //prepare field to find
    if (arrSize[0] === undefined) {
      arrSize = [...uniqueSizessizes];
    }
    if (arrColor[0] === undefined) {
      arrColor = [...uniqueColors];
    }
    if (arrType[0] === undefined) {
      arrType = [...uniqueTypes];
    }

    //find product with type
    const arrProductCode = await ProductCode.find({type:{$in: arrType}});
    var listProducCode = [];
    arrProductCode.forEach(prdCode => listProducCode.push(prdCode._id));

    const customProduct = await Product.find({
      idProductCode:{$in: listProducCode},
      type: {$in : arrType},
      size: {$in : arrSize}
    })
    console.log(175, customProduct)
    //render all data  
    res.render("pages/product",
      {
        products: productCodes,
        types: uniqueTypes,
        colors: uniqueColors,
        sizes: uniqueSizes
      });

  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Lỗi server",
    });
  }
};
