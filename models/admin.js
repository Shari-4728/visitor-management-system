const mongoose = require("mongoose");
const bcrypt = require ("bcryptjs");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [ true, "Enter a username" ],
    unique: true
  },
  auth_key: {
    type: String,
    required: [ true, "Enter the authentication key" ]
  },
  password: {
    type: String,
    required: [ true, "Enter password" ],
    minlenghth: [ 8, "Minimum length for password is 8 characters" ]
  }
})

//Hash password
adminSchema.pre ('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash (this.password, salt);
    
    next();
  });
  
   //login function
adminSchema.statics.login = async function (username, auth_key, password) {
    
    const admin = await this.findOne({username});
    
    if (admin) {
      if (auth_key === admin.auth_key){
        const auth = await bcrypt.compare (password, admin.password);
      
        if (auth) {
         return admin;
        }
        throw Error("Incorrect password");
      }
      throw Error("Incorrect authentication key");
    }
    throw Error ("Incorrect username")
  }

const Admin = mongoose.model ('admins', adminSchema);
  
module.exports = Admin;