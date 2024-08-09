const { body, query, checkExact } = require("express-validator");

const userRegistrationValidator = checkExact([
    body("name")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Please provide valid name"),
    body("email")
      .notEmpty()
      .withMessage("Please provide email")
      .isEmail()
      .withMessage("Please provide valid email"),
    body("password")
      .isString()
      .isLength({ min: 8 })
      .withMessage("password must be at least 8 characters long"),
  ]);
  
  const userLoginValidator = checkExact([
    body("email")
      .notEmpty()
      .withMessage("Please provide email")
      .isEmail()
      .withMessage("Please provide valid email"),
    body("password")
      .isString()
      .isLength({ min: 8 })
      .withMessage("password must be at least 8 characters long"),
  ]);


  module.exports = {userRegistrationValidator, userLoginValidator}