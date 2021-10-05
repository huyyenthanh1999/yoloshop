const Product = require("../models/productModel");
const ProductCode = require("../models/productCodeModel");
module.exports.getProductDetail = async (req, res) => {
  const idProductCode = req.body.params;
  try {
    const productCode = await ProductCode.findOne({
      id: idProductCode,
    });
    const products = await Product.find({
      idProductCode: productCode.id,
    });

    res.status(200).json({
      status: "success",
      data: {
        productCode,
        products,
      },
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
