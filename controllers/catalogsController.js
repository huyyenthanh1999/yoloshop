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
    res.render("pages/product_detail", {
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
      message: "Lỗi server",
    });
  }
};

module.exports.getCustomProduct = async (req, res) => {
  try {
    //get type, size and color from query
    var arrType = req.query.type.split(',');
    var arrColor = req.query.color.split(',');
    var arrSize = req.query.size.split(',');

    //get all type
    const productCodes = await ProductCode.find();
    const types = productCodes.map(productCode => productCode.type)
    var uniqueTypes = [...new Set(types)]

    //get all color
    const products = await Product.find();
    const colors = products.map(product => product.color)
    var uniqueColors = [...new Set(colors)]

    //get all size
    const sizes = products.map(product => product.size)
    var uniqueSizes = [...new Set(sizes)]

    //prepare field to find
    if (arrSize[0] === "") {
      arrSize = [...uniqueSizes];
    }
    if (arrColor[0] === "") {
      arrColor = [...uniqueColors];
    }
    if (arrType[0] === "") {
      arrType = [...uniqueTypes];
    }

    //find product with type
    const arrPrdCodeType = await ProductCode.find({ type: { $in: arrType } });
    var listPrdCodeTypeId = arrPrdCodeType.map(prdCode => prdCode._id);

    //find product with color
    const arrPrdCodeColor = await Product.find({
      idProductCode: { $in: listPrdCodeTypeId },
      color: { $in: arrColor }
    });
    var listPrCodeColorId = arrPrdCodeColor.map(prdCode => prdCode._id);

    //find product with size
    const customProduct = await Product.find({
      _id: { $in: listPrCodeColorId },
      size: { $in: arrSize }
    })

    //get productId to render
    var listIdProduct = customProduct.map(prd => prd.idProductCode);
    const renderProduct = await ProductCode.find({ _id: { $in: listIdProduct } })

    res.status(200).json({
      status: 'success',
      data: renderProduct
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: "fail",
      message: "Lỗi server",
    });
  }
}

module.exports.getAllCatalog = async (req, res) => {
  try {
    let perPage = 12;
    let page = req.params.page || 1;
    //get all type
    const productCodes = await ProductCode.find();
    const types = productCodes.map(productCode => productCode.type)
    var uniqueTypes = [...new Set(types)]

    //get all color
    const products = await Product.find();
    const colors = products.map(product => product.color)
    var uniqueColors = [...new Set(colors)]

    //get all size
    const sizes = products.map(product => product.size)
    var uniqueSizes = [...new Set(sizes)]

    //render data each page 
    ProductCode
      .find()
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec((err, prds) => {
        ProductCode.countDocuments((err, count) => {
          if (err) return next(err);

          res.render("pages/product",
            {
              products: prds,
              types: uniqueTypes,
              colors: uniqueColors,
              sizes: uniqueSizes,
              current: page,
              pages: Math.ceil(count / perPage)
            });
        });
      });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Lỗi server",
    });
  }
};
