const mongoose = require("mongoose");

const eventModel = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    date: { type: String, required: true },
    time: { type: String, require: true },
    description: { type: String, required: true },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

eventModel.virtual("id").get(function () {
  return this._id;
});

eventModel.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const Event = mongoose.model("Event", eventModel);
module.exports = Event;
