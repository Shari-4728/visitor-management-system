const Admin = require('../models/admin');
const Visitor = require('../models/visitor');
const Event = require('../models/upcomingEvents');
const Appointment = require('../models/appointments');
const Joined = require('../models/joinedEvents');
const jwt = require ("jsonwebtoken");
const cookieParser = require('cookie-parser');
const express= require('express');

// const server = express();
// server.use(cookieParser());


/* Error handling */
  //Visitor error handling
const guestErrors = (err) => {
  console.log (err.message, err.code);

  let errors = { email: '', password: '', name: '', phone: ''};
  
  if (err.message === "Incorrect email") {
    errors.email = "That email is not registered"
  }
  
   if (err.message === "Incorrect password") {
    errors.password = "Wrong password"
  }
  
  if (err.code === 11000) {
    errors.email = "Email address is already in use";
    return errors;
  }
  
  if (err.message.includes('visitors validation failed')) {
    Object.values(err.errors).forEach( ({properties}) => {
      
      errors [properties.path] = properties.message;
    })
  }

  return errors;
}

  //Admin error handling
const adminErrors = (err) => {
  console.log (err.message, err.code);

  let errors = { username: '', auth_key: '', password: ''};
  
  if (err.message === "Incorrect username") {
    errors.username = "That username is not registered"
  }
  
  if (err.message === "Incorrect authentication key") {
    errors.authkey = "Wrong authentication key"
  }
  
  if (err.message === "Incorrect password") {
    errors.password = "Wrong password"
  }
  
  if (err.code === 11000) {
    errors.username = "Username already in use";
    return errors;
  }
  
  if (err.message.includes('admins validation failed')) {
    Object.values(err.errors).forEach( ({properties}) => {
      
      errors [properties.path] = properties.message;
    })
  }

  return errors;
}

  //EventPosting Error handling
const eventErrors = (err) => {
  console.log (err.message, err.code);

  let errors = { name: '', description: '', date: '', time: '' };
  
  if (err.message.includes('upcomingEvents validation failed')) {
    Object.values(err.errors).forEach( ({properties}) => {
      
      errors[properties.path] = properties.message;
    })
  }

  return errors;
}

  //Eventjoining Error handling
const joinErrors = (err) => {
  console.log (err.message, err.code);

  let errors = { email: '', event_name: '' };
  
  if (err.message.includes('joinedEvents validation failed')) {
    Object.values(err.errors).forEach( ({properties}) => {
      
      errors[properties.path] = properties.message;
    })
  }

  return errors;
}

  //Appointments Error handling
const appointmentErrors = (err) => {
  console.log (err.message, err.code);

  let errors = { email: '', description: '', date: '', time: '', department:  '', access:''};
  
  if (err.message.includes('appointments validation failed')) {
    Object.values(err.errors).forEach(({properties}) => {
      
      errors [properties.path] = properties.message;
    });
  }

  return errors;
}

/* Error handling */


/*Tokens*/
const maxAge = 3 * 24 * 60 * 60;
const secret = 'KJB523%VJN@309UNC-NWYUJGB874I082I!*CJH';
const createToken = (id) => {
  return jwt.sign ({ id }, secret, { expiresIn: maxAge});
}
/*Tokens*/


module.exports.createGuest = async(req, res) => {
  const {name, email, phone, password} = req.body;
  console.log(req.body);
  
  try{
    const guest = await Visitor.create({name, email, phone, password});
    const token = createToken(guest._id);
    res.cookie ('guestJWT', token, {httpOnly: true, expiresIn: maxAge * 1000});
    res.status(201).json({guest: guest._id})
  }
  catch(err){
    console.log(err);
    const errors = guestErrors(err);
    res.status(400).json({errors});
  }
}

module.exports.loginGuest = async(req, res) => {
  console.log (req.body);
  
  const { email, password } = req.body;
  
  try{ 
    const guest = await Visitor.login (email, password);
    const token = createToken (guest._id);
    res.cookie ('guestJWT', token, {httpOnly: true, expiresIn: maxAge * 1000});
    res.status(200).json ({guest: guest._id})
  }
  catch (err) {
    console.log(err);
    const errors = guestErrors(err);
    res.status(400).json ({errors});
  }
}

module.exports.createAdmin = async(req, res) => {
  const {username, auth_key, password} = req.body;
  
  try {
    const admin = await Admin.create({username, auth_key, password});
    const token = createToken (admin._id);
    res.cookie ('adminJWT', token, {httpOnly: true, expiresIn: maxAge * 1000});
    res.status(200).json ({admin: admin._id})
  }
  catch(err){
    const errors = adminErrors(err);
    res.status(400).json ({errors});
  }
}

module.exports.loginAdmin = async(req, res) => {
  console.log (req.body);
  
  const { username, auth_key, password } = req.body;
  
  try{ 
    const admin = await Admin.login (username, auth_key, password);
    const token = createToken (admin._id);
    res.cookie ('adminJWT', token, {httpOnly: true, expiresIn: maxAge * 1000});
    res.status(200).json ({admin: admin._id})
  }
  catch (err) {
    const errors = guestErrors(err);
    res.status(400).json ({errors});
  }
}

module.exports.postEvent = async(req, res) => {
  const {name, description, venue, date, time} = req.body;
  console.log(req.body);
  
  try{
    const event = await Event.create({name:name, description:description, venue:venue, date:date, time:time, posted_at: Date.now()});
    res.status(200).json({event});
  }
  catch(err){
    console.log(err);
    const errors = eventErrors(err);
    res.status(400).json({errors});
  }
}

module.exports.join = async(req, res) => {
  const {email, event_name} = req.body;
  console.log(req.body);
  
  try{
    const joinedEvent = await Joined.create({email: email, event_name: event_name, joined_at: Date.now()});
    res.status(200).json({joinedEvent});
  }
  catch(err){
    console.log(err);
    const errors = joinErrors(err);
    res.status(400).json({errors});
  }
}

module.exports.bookAppointment = async (req, res) => {
  const { email, department, date, time, description, pass_type, unique_id } = req.body;
  console.log(req.body);
  
  try{
    const appointment = await Appointment.create({ 
      user: {email},
      appointment: {
        department: department,
        date: date,
        time: time,
        description: description,
        booked_at: Date.now(),
        status: "pending",
        pass_type: pass_type,
        unique_id: unique_id
      }
    
    });
    res.status(200).json({appointment});
  }
  catch(err){
    console.log(err);
    const errors = appointmentErrors(err);
    res.status(400).json({errors});
  }
}

module.exports.approve = async (req, res) => {
  const { email, department, date, time, description, access, unique_id } = req.body;
  console.log(req.body);
  
  const id = req.params.id;
  try{
     const approval = await Appointment.findByIdAndUpdate(id, { 
        user: {email: email},
        appointment: {
          department: department,
          date: date,
          time: time,
          description: description,
          status: "Approved",
          pass_type: access,
          unique_id: unique_id,
          approved_at: Date.now()
        }        
     },
     {useFindAndModify: false} );

    res.status(200).json({approval});
  }
  catch(err){
    console.log(err);
  }

  // User.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
  // .then(data => {
  //     if(!data){
  //         res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
  //     }else{
  //         res.send(data)
  //     }
  // })
  // .catch(err =>{
  //     res.status(500).send({ message : "Error Update user information"})
  // })
}

module.exports.logoutGuest = (req, res)=> {
  res.cookie('guestJWT', '', { maxAge: 1 });
  res.redirect('/');
}

module.exports.logoutAdmin = (req, res)=> {
  res.cookie('adminJWT', '', { maxAge: 1 });
  res.redirect('/');
}

module.exports.findEvent = async(req, res) => {
  if(req.query.id){
    const id = req.query.id;

    Event.findById(id)
      .then(data =>{
        if(!data){
          res.status(404).send({ message : "Not found event with id "+ id})
        }else{
          res.send(data);
          console.log(data);
        }
      })
      .catch(err =>{
        console.log(err);
        res.status(500).send({ message: "Error retrieving event with id " + id})
      })

  }else{
    Event.find()
      .then(event => {
          res.send(event)
      })
      .catch(err => {
        res.status(500).send({ message : err.message || "Error Occurred while retriving event information" })
    })
  }
}

module.exports.findApt = async(req, res) => {
  if(req.query.id){
    const id = req.query.id;

    Appointment.findById(id)
      .then(data =>{
        if(!data){
          res.status(404).send({ message : "Not found event with id "+ id})
        }else{
          res.send(data);
          console.log(data);
        }
      })
      .catch(err =>{
        res.status(500).send({ message: "Error retrieving event with id " + id})
      })

  }else{
    Appointment.find()
      .then(apt => {
          res.send(apt)
      })
      .catch(err => {
        res.status(500).send({ message : err.message || "Error Occurred while retriving event information" })
    })
  }
}

/*
module.exports.find = async(req, res) => {
  if(req.query.id){
    const id = req.query.id;

    User.findById(id)
      .then(data =>{
        if(!data){
          res.status(404).send({ message : "Not found user with id "+ id})
        }else{
          res.send(data);
          console.log(data);
        }
      })
      .catch(err =>{
        res.status(500).send({ message: "Erro retrieving user with id " + id})
      })

  }else{
    User.find()
      .then(user => {
          res.send(user)
      })
      .catch(err => {
        res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
    })
  }
}
*/
