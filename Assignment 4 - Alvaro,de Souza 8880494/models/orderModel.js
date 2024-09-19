const mongoose = require("mongoose");

// Create a Schema
const orderSchema = new mongoose.Schema({
    email: { type: String, lowercase: true },
    fullname: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    city: { type: String },
    postalCode: { type: String },
    province: { type: String },
    productOne: { type: String },
    productTwo: { type: String },
    productThree: { type: String },
    deliveryTime: { type: String },
});

// Create a Model
const Order = mongoose.model("Order", orderSchema);

// Export the model
module.exports = { Order };
