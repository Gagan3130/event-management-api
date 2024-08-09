const { body, checkExact } = require("express-validator");
const { isMatch, parseISO, isFuture } = require("date-fns");

const createEventValidator = checkExact([
  body("name")
    .notEmpty()
    .withMessage("Please enter name of the event")
    .isString()
    .withMessage("Enter valid event name"),
  body("date")
    .notEmpty()
    .withMessage("Please enter Date")
    .custom((value) => {
      const parsedDate = parseISO(value);
      if (!isMatch(value, "yyyy-MM-dd") || !isFuture(parsedDate)) {
        throw new Error(
          "Invalid or past date. Expected YYYY-MM-DD and a future date"
        );
      }
      return true;
    }),
  body("time")
    .notEmpty()
    .withMessage("Please enter event time")
    .custom((value) => {
      if (!isMatch(value, "HH:mm")) {
        throw new Error("Invalid time format. Expected HH:MM");
      }
      return true;
    }),
  body("description")
    .notEmpty()
    .withMessage("Please provide description")
    .isString()
    .withMessage("Invalid description"),
]);

const updateEventValidator = checkExact([
  body("name").optional().isString().withMessage("Enter valid event name"),
  body("date")
    .optional()
    .custom((value) => {
      const parsedDate = parseISO(value);
      if (!isMatch(value, "yyyy-MM-dd") || !isFuture(parsedDate)) {
        throw new Error(
          "Invalid or past date. Expected YYYY-MM-DD and a future date"
        );
      }
      return true;
    }),
  body("time")
    .optional()
    .custom((value) => {
      if (!isMatch(value, "HH:mm")) {
        throw new Error("Invalid time format. Expected HH:MM");
      }
      return true;
    }),
  body("description").optional().isString().withMessage("Invalid description"),
]);

module.exports = { createEventValidator, updateEventValidator };
