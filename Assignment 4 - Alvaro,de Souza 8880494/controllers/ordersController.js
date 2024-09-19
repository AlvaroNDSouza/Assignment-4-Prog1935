const { Order } = require("../models/orderModel");

const getAllOrders = async (req, res) => {
  let orders = await Order.find({}).exec();
  res.render("pages/allorders", { orders: orders });
};

const getOneOrder = async (req, res) => {
  let order = await Order.findById(req.params.id).exec();
  res.render("pages/vieworder", { order: order });
};

const deleteOneOrder = async (req, res) => {
  await Order.findByIdAndDelete(req.params.id).exec();
  res.redirect("/orders");
};

module.exports = {
  getAllOrders,
  getOneOrder,
  deleteOneOrder,
};
