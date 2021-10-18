const Cart = require("../models/CartModel");

module.exports.renderCart = (req, res) => {
  res.render("pages/cart");
};

module.exports.getAllCart = async (req, res) => {
  try {
    const carts = await Cart.find({});

    res.status(200).json({
      status: "success",
      carts,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Lỗi server",
    });
  }
};

// module.exports.getDetailCart = async (req, res) => {
//   try {
//     const cart = await Cart.find({ _id: "615a49d9ff54f53a4fa59382" })
//     //   .populate("userId")
//       .populate({ path: "list", populate: { path: "productId" } });
    
//     res.status(200).json({
//       status: "success",
//       cart,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "fail",
//       message: "Lỗi server",
//     });
//   }
// };

module.exports.createCart = async (req, res) => {
  try {
    const checkProduct = await Cart.findOne({ productId: req.body._productId });
    if (checkProduct) {
      res.json({ status: 400, mess: 'Product existed' });
    } else {
      await Cart.create({
        userId: req.body._userId, 
        cost: req.body._cost, 
        productId: req.body._productId,
        quantity: req.body._quantity,
      });
      res.json({ status: 200, mess: 'Create cart success!' });
    }
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Lỗi server",
    });
  }
}

module.exports.updateCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate({ productId: req.body._productId }, { quantity: req.body._quantity });
    if (!cart)
      return res.status(400).json({
        status: "fail",
        message: "Không tìm thấy cart",
      });

    res.status(200).json({
      status: "success",
      message: "Update cart thành công",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Lỗi server",
    });
  }
};

module.exports.deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({ productId: req.body._productId });
    if (!cart)
      return res.status(400).json({
        status: "fail",
        message: "Không tìm thấy cart",
      });

    res.status(200).json({
      status: "success",
      message: "Xóa cart thành công",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Lỗi server",
    });
  }
};
