const express = require("express");
const router = express.Router();

// Import controllers. validators
const { getOrder, postOrder } = require("../controllers/orderControllers");
const {
    getAllOrders,
    getOneOrder,
    deleteOneOrder,
} = require("../controllers/ordersController");
const { OrderValidators } = require("../middleware/validators");

router
    .get("/", getOrder)
    .post("/", OrderValidators, postOrder)
    .get("/orders", getAllOrders)
    .get("/order/:id", getOneOrder)
    .get("/delete/:id", deleteOneOrder);

//Export the router
module.exports = router;
