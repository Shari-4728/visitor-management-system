const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require ('path');
const morgan = require ('morgan');
const dotenv = require('dotenv');
const connectDB = require('./database/database.js');
const authRoutes = require ('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { guestAuth, checkGuest, adminAuth, checkAdmin} = require('./middleware/middleware');
const app = express();

//configure environment variables
dotenv.config ( {
  path: '.env'
});

//connect to database
connectDB();

//Set view engine
app.set ('view engine', 'ejs');
app.set ('views', path.resolve(__dirname, 'views'));

//middleware
app.use(morgan("dev"));
app.use(express.static("./public"));
app.use (bodyParser.urlencoded( {
  extended: true
}));
app.use(cookieParser());
app.use(authRoutes);
app.use(checkAdmin);

const port = process.env.PORT || 8080;

app.listen (port, ()=>{
  console.log(`App listening at: http://localhost:${port}`);
})