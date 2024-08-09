const errorCodes = require("../utils/error-codes");

const checkRole = (roles) => async (req, res, next) => {
  const role = req.user.role;
  if (!roles.includes(role)) {
    return res.status(403).json({
      error: "Sorry you do not have access to this route",
      code: errorCodes.ACCESS_DENIED,
    });
  }
  next();
};

module.exports = checkRole;
