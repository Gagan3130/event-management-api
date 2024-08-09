const express = require("express");
const {
  createEventValidator,
  updateEventValidator,
} = require("../validators/events.validator");
const {
  validateRequestSchema,
} = require("../validators/validateRequestSchema");
const {
  createNewEvent,
  updatingEventDetails,
  eventRegistration,
  getAllEventsDetails,
  getEventDetails,
  getAllUserEventBookings,
} = require("../controllers/event.controller");
const middlewares = require("../middlewares/index");
const roles = require("../config/roles");
const router = express.Router();

router
  .route("/")
  .get(middlewares['authMiddleware'], getAllEventsDetails)
  .post(
    middlewares['authMiddleware'],
    middlewares["checkRole"]([roles.admin]),
    createEventValidator,
    validateRequestSchema,
    createNewEvent
  );
router.route("/bookings").get(middlewares['authMiddleware'], getAllUserEventBookings)  
router
  .route("/:eventId")
  .get(middlewares['authMiddleware'], getEventDetails)
  .put(
    middlewares['authMiddleware'],
    middlewares["checkRole"]([roles.admin]),
    updateEventValidator,
    validateRequestSchema,
    updatingEventDetails
  );

router
  .route("/:eventId/register")
  .post(middlewares['authMiddleware'], eventRegistration);

module.exports = router;
