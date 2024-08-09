const asyncHandler = require("express-async-handler");
const { EventServices } = require("../services/event.service");
const { ConflictError, NotFoundError } = require("../utils/custom-error");
const errorCodes = require("../utils/error-codes");

const createNewEvent = asyncHandler(async (req, res) => {
  const { date, time, description, name } = req.body;
  const eventExist = await EventServices.findEventByPropertyName({ name });
  if (eventExist) {
    throw new ConflictError({
      message: "Event already exist",
      code: errorCodes.CONFLICT_ERROR,
    });
  }
  const event = await EventServices.registerNewEvent({
    date,
    time,
    description,
    name,
  });
  res.status(201).json(event);
});

const updatingEventDetails = asyncHandler(async (req, res) => {
  const { name, date, time, description } = req.body;
  const eventId = req.params.eventId;
  const eventExist = await EventServices.findEventByPropertyName({
    _id: eventId,
  });
  if (!eventExist) {
    throw new NotFoundError({
      message: "Event not found",
      code: errorCodes.EVENT_NOT_FOUND,
    });
  }
  const event = await EventServices.updateEventsDetails(eventId, {
    name,
    date,
    time,
    description,
  });
  res.status(200).json(event);
});

const eventRegistration = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const eventId = req.params.eventId;
  const eventExist = await EventServices.findEventByPropertyName({
    _id: eventId,
  });
  if (!eventExist) {
    throw new NotFoundError({
      message: "Event not found",
      code: errorCodes.EVENT_NOT_FOUND,
    });
  }

  const event = await EventServices.updateEventsDetails(eventId, {
    $addToSet: { participants: id },
  });
  await EventServices.sendEventRegistrationMail({userId: id})
  res.status(200).json({
    msg: "Registered Successfully",
    eventDetails: {
      name: event.name,
      id: event.id,
      date: event.date,
      time: event.time,
      description: event.description,
    },
  });
});

const getAllEventsDetails = asyncHandler(async (req, res) => {
  let search = req.query.search;
  if (search === undefined || search === null) {
    search = "";
  }
  const events = await EventServices.geAllEvents(search);
  res.status(200).json(events);
});

const getEventDetails = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  const event = await EventServices.findEventByPropertyName({
    _id: eventId,
  });
  if (!event) {
    throw new NotFoundError({
      message: "Event not found",
      code: errorCodes.EVENT_NOT_FOUND,
    });
  }
  res.status(200).json(event);
});

const getAllUserEventBookings = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const events = await EventServices.getUsersRegisteredEvents(id);
  res.status(200).json(events);
});

module.exports = {
  createNewEvent,
  updatingEventDetails,
  eventRegistration,
  getAllEventsDetails,
  getEventDetails,
  getAllUserEventBookings,
};
