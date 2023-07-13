const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  user: {
    email: {
      type: String,
      required: [ true, "Enter an email"]
    }
  },
  
  appointment: {
    department: {
      type: String,
      required: [ true, "Enter a department"]
    },
    date: {
      type: String,
      required:  [ true, "Enter an event date"]
    },
    time: {
      type: String,
      required:  [ true, "Enter an event time"]
    },
    description: {
      type: String,
      required:  [ true, "Enter a description"]
    },
    booked_at: {
      type: Date
    },
    status: {
      type: String
    },
    pass_type:  {
      type: String,
      required: [ true, "Select type of pass"]
    },
    approved_at:  {
      type: Date
    },
    unique_id: {
      type: String
    }
  }
  
});

const Appointment = mongoose.model ('appointments', appointmentSchema);
  
module.exports = Appointment;