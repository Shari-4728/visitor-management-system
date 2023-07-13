const mongoose = require ('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect (process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    
    console.log ("MongoDB connected");
  }
  catch (err) {
    console.log (err);
    process.exit (1);
  }
}

module.exports = connectDB;