const { validationResult } = require("express-validator");
const { Order } = require("../models/orderModel");

const salesTaxRates =
{
  Ontario: 0.13,
  BritishColumbia: 0.12,
  Quebec: 0.15,
  Alberta: 0.05,
  Manitoba: 0.13,
  NovaScotia: 0.15,
  NewfoundlandAndLabrador: 0.15,
  NewBrunswick: 0.15,
  NorthwestTerritories: 0.05,
  PrinceEdwardIsland: 0.05,
  Yukon: 0.05,
  Saskatchewan: 0.11,
  Nunavant: 0.05,
}
  const product1Price = 3;
  const product2Price = 5;
  const product3Price = 10;


function getSalesTaxRate(province) {
  return salesTaxRates[province] || 0;
}

const getOrder = (req, res) => {
  res.render("pages/order");
};
const postOrder = (req, res) => {
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.render("pages/order", { errors: errors.array() });
  } else {
   
    let email = req.body.email;
    let fullname = req.body.fullname;
    let phoneNumber = req.body.phoneNumber;

    let address = req.body.address;
    let city = req.body.city;
    let postalCode = req.body.postalCode;
    let province = req.body.province;

    let product1 = req.body.product1;
    let product2 = req.body.product2;
    let product3 = req.body.product3;
    
    let deliveryTime = req.body.deliveryTime;



  

    const deliveryTimes =
    {
      "1 Day": 5,
      "3 Days": 3,
      "5 Days": 2,
    };

    let productOne = product1 * product1Price;
    let productTwo = product2 * product2Price;
    let productThree = product3 * product3Price;

    let deliveryAddress = address + ", " + city + ", " + province + ", " + postalCode;

   
    const shippingCost = deliveryTimes[deliveryTime];
    const total = productOne + productTwo + productThree + shippingCost ;

    let newOrder = new Order({
      fullname: fullname,
      email: email,
      address: address,
      city: city,
      province: province,
      phoneNumber: phoneNumber,
      postalCode: postalCode,
      productOne: productOne,
      productTwo: productTwo,
      productThree: productThree,
      deliveryTime: deliveryTime,
    });  
    newOrder
    .save()
    .then()
    .catch((error) => {
      console.log(error.message);
    });

    // if (total < 10) {
    //   return res.status(400).json({ errors: [{msg: "Total cost of items should be at least $10"}]});
    // }

    const salesTax = total * getSalesTaxRate(province);

   

    res.render("pages/receipt", {
      fullname,
      email,
      phoneNumber,
      address,
      city,
      postalCode,
      province,
      product1,
      product2,
      product3,
      productOne,
      productTwo,
      productThree,
      deliveryTime,
      deliveryAddress,
      total,
      salesTax,
      shippingCost,
      getSalesTaxRate, 
    })

   }
};

module.exports = {
  getOrder,
  postOrder,
};
