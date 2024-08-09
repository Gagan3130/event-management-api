const errorCodes = require("../utils/error-codes");
const { UnAuthorisedError } = require("../utils/custom-error");
const { decodeJwtToken } = require("../utils");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    const token = authHeader.split(" ")[1];

    if (!token)
      res.status(403).json({
        error: "Access Denied",
        code: errorCodes.ACCESS_DENIED,
      });

    const decoded = decodeJwtToken(token);
    console.log(decoded,"decoded")
    req.user = decoded;
    next();
  } catch (error) {
    throw new UnAuthorisedError({
      code: errorCodes.UNAUTHORISED,
      message: "Unauthorised",
    });
  }
};

module.exports = authMiddleware;
