const Event = require("../models/events.model");
const User = require("../models/user.model");
const Email = require("../utils/email");

class EventService {
  async registerNewEvent(body) {
    const event = await Event.create({
      ...body,
      participants: [],
    });
    return event;
  }
  async findEventByPropertyName(property) {
    const event = await Event.findOne(property);
    return event;
  }

  async updateEventsDetails(eventId, updateDetails) {
    const event = await Event.findByIdAndUpdate(eventId, updateDetails, {
      new: true,
    });
    return event;
  }
  async geAllEvents(search) {
    const keyword = {
      $or: [{ name: { $regex: search } }, { description: { $regex: search } }],
    };
    const events = await Event.find(keyword);
    return events;
  }

  async getUsersRegisteredEvents(userId) {
    const events = Event.find({
      participants: { $elemMatch: { $eq: userId } },
    }).select("-participants");
    return events;
  }

 async sendEventRegistrationMail({userId}){
    const user = await User.findOne({_id: userId})
    const EmailService = new Email({ email: user.email, name: user.name })
    EmailService.sendEventRegistrationMail()
  }
}

const EventServices = new EventService();

module.exports = { EventServices };
