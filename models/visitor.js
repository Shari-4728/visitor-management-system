const mongoose = require("mongoose");
const { isEmail } = require ("validator");
const bcrypt = require ("bcryptjs");

const guestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [ true, "Enter your name!" ]
  },
  email: {
    type: String,
    required: [ true, "Enter an email address"],
    lowercase: [true, "Use lowercase for email address"],
    unique: true,
    validate: [isEmail, "Invalid email address"]
  },
  phone: {
    type: String,
    required: [ true, "Enter your phone number!" ]
  },
  password: {
    type: String,
    required: [ true, "Enter a password" ],
    minlength: [6, "Minimum length for password is 6 characters"]
  }
  /*,
  appointment: {
      request: { type: String },
      date: { type: String },
      agenda: { type: String }
    },
  passes: {
      level_1: { type: String },
      level_2: { type: String }
    }*/
})

//Hash password
guestSchema.pre ('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash (this.password, salt);
    
    next();
  });
  
  //login function
guestSchema.statics.login = async function (email, password) {
    
    const guest = await this.findOne({email});
    if (guest) {
      const auth = await bcrypt.compare (password, guest.password);
      
      if (auth) {
        return guest;
      }
      throw Error("Incorrect password")
    }
    throw Error ("Incorrect email")
  }

const Visitor = mongoose.model ('visitors', guestSchema);
  
module.exports = Visitor;