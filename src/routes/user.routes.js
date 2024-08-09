const express = require("express");
const {
  userRegistrationValidator,
  userLoginValidator,
} = require("../validators/user.validator");
const {
  validateRequestSchema,
} = require("../validators/validateRequestSchema");
const {
  registerUser,
  authenticateUser,
} = require("../controllers/user.controller");

const router = express.Router();
router
  .route("/signup")
  .post(userRegistrationValidator, validateRequestSchema, registerUser);
router
  .route("/login")
  .post(userLoginValidator, validateRequestSchema, authenticateUser);
module.exports = router;
