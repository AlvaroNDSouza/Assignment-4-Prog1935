const { check, oneOf, body} = require("express-validator");

const OrderValidators = [
  check("fullname").not().isEmpty().withMessage("Please enter your full name"),
  check("email").isEmail().withMessage("Please enter your email address"),
  check("phoneNumber").matches(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/).withMessage("Please enter your phone number"),
  check("city").not().isEmpty().withMessage("Please enter your city"),
  check("postalCode").matches(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/).withMessage("Please enter a valid postal code"),
  check("province").not().isEmpty().withMessage("Please enter your province"),
  
  //Put a better message for invalid value
  check("product1").not().equals("0").isInt({min:0}).optional({ checkFalsy: true }).isNumeric().withMessage("Please enter a valid Product 1 Number"),
  check("product2").not().equals("0").isInt({min:0}).optional({ checkFalsy: true }).isNumeric().withMessage("Please enter a valid Product 2 Number"),
  check("product3").not().equals("0").isInt({min:0}).optional({ checkFalsy: true }).isNumeric().withMessage("Please enter a valid Product 3 Number"),
  
  //Validating the 10 Bucks in the validator 
  check('total').custom((value, { req }) => {
    const product1Price = 3;
    const product2Price = 5;
    const product3Price = 10;

    const product1 = req.body.product1 ? parseInt(req.body.product1) : 0;
    const product2 = req.body.product2 ? parseInt(req.body.product2) : 0;
    const product3 = req.body.product3 ? parseInt(req.body.product3) : 0;

    const total = product1 * product1Price + product2 * product2Price + product3 * product3Price;

    if (total < 10) {
      throw new Error('Total cost of items should be at least $10');
    }

    return true;
  }),
  
  oneOf([
    body("product1").not().isEmpty(),
    body("product2").not().isEmpty(),
    body("product3").not().isEmpty()
  ],{message: "Please input at least one product"}),
];

module.exports = {
  OrderValidators,
};
