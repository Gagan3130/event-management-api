const asyncHandler = require("express-async-handler");
const { AuthUserService } = require("../services/user.service");
const {
  ConflictError,
  NotFoundError,
  ValidationError,
} = require("../utils/custom-error");
const errorCodes = require("../utils/error-codes");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await AuthUserService.findUserByEmail(email);
  if (user) {
    throw new ConflictError({
      message: "Email already Exist",
      code: errorCodes.CONFLICT_ERROR,
    });
  }
  const response = await AuthUserService.registerUser({
    name,
    email,
    password,
  });
  res.status(201).json(response);
});

const authenticateUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await AuthUserService.findUserByEmail(email);
  if (!user)
    throw new NotFoundError({
      message: "User not found",
      code: errorCodes.USER_NOT_FOUND,
    });
  const verifyPassword = await user.comparePassword(password);
  if (!verifyPassword)
    throw new ValidationError({
      message: "Invalid Password",
      code: errorCodes.VALIDATION_ERROR,
    });
  const response = AuthUserService.IssueToken(user);
  res.status(200).json(response);
});

module.exports = { registerUser, authenticateUser };
