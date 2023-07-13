const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [ true, "Enter an event name"]
  },
  description: {
    type: String,
    required: [ true, "Enter an event description"]
  },
  venue: {
    type: String,
    required: [true, "Enter a venue"]
  },
  date: {
    type: String,
    required:  [ true, "Enter an event date"]
  },
  time: {
    type: String,
    required:  [ true, "Enter an event time"]
  },
  posted_at: {
    type: Date
  }
});

const Event = mongoose.model ('upcomingEvents', eventSchema);
  
module.exports = Event;