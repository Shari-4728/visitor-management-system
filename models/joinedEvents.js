const mongoose = require("mongoose");

const joinedEvents = new mongoose.Schema({
  email: {
    type: String,
    required: [ true, "Enter email"]
  },
  event_name: {
    type: String,
    required: [ true, "Enter an event name"]
  },
  joined_at: {
    type: Date
  }
});

const Joined = mongoose.model ('joinedEvents', joinedEvents);
  
module.exports = Joined;