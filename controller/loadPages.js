const axios = require('axios');
const Admin = require('../models/admin');
const Visitor = require('../models/visitor');
const Event = require('../models/upcomingEvents');
const Appointment = require('../models/appointments');

module.exports.get_home = async (req, res) => {
  const pageDetails = {
    title: "Home"
  };
  res.render('index', { pageDetails });
}

module.exports.get_admin = async (req, res) => {
   const pageDetails = {
    title: "Dashboard - Admin"
  };

  try{
    const appointments = await Appointment.find({});
    const events = await Event.find({});
    res.render('admin', { appointments, pageDetails, events });
  }
  catch(err){
    console.log(err);
  }
}

module.exports.get_visitor = async (req, res) => {
  const pageDetails = {
    title: "Dashboard - Visitor"
  };
  res.render('visitor', { pageDetails });
}

module.exports.guestForm = async (req, res) => {
  const pageDetails = {
    title: "Visitor - Form"
  };
  res.render('guestForm', { pageDetails });
}

module.exports.guestLogin = async (req, res) => {
  const pageDetails = {
    title: "Visitor - Login"
  };
  res.render('guestLogin', { pageDetails });
}

module.exports.adminForm = async (req, res) => {
  const pageDetails = {
    title: "Admin - Form"
  };
  res.render('adminForm', { pageDetails });
}
module.exports.adminSignup = async (req, res) => {
  const pageDetails = {
    title: "Admin - SignUp"
  };
  res.render('createAdmin', { pageDetails });
}

module.exports.guestAps = async (req, res) => {
  const pageDetails = {
    title: "Appointments"
  };
  
  try{
    const appointments = await Appointment.find();
    res.render('guestAps', { appointments, pageDetails });
  }
  catch(err){
    console.log(err);
  }
  res.render('guestAps', { pageDetails });

}

module.exports.guestEvents = async (req, res) => {
  const pageDetails = {
    title: "Events"
  };
  try {
    const events = await Event.find({});
    res.render('guestEvents', { pageDetails, events });
  } catch(err){
    console.log(err);
  }
}

module.exports.adminAps = async (req, res) => {
  const pageDetails = {
    title: "Appointments"
  };
  try{
    const appointments = await Appointment.find({});
    res.render('adminAps', { appointments, pageDetails });
  }
  catch(err){
    console.log(err);
  }
}

module.exports.adminEvents = async (req, res) => {
  const pageDetails = {
    title: "Events"
  };
  try{
    const events = await Event.find({});
    res.render('adminEvents', { events, pageDetails });
  }
  catch(err){
    console.log(err);
  }
}

module.exports.approveApt = async (req, res) => {
  const pageDetails = {
    title: "Approve Appointment"
  };
  
  axios.get('http://localhost:3000/findApt', { params: { id: req.query.id }})
    .then(function(aptData){
        res.render("approve", { appointment: aptData.data, pageDetails})
    })
    .catch(err =>{
        res.send(err);
    })
  //res.render('approve', { pageDetails });
}

module.exports.joinPage = (req, res) => {
  const pageDetails = {
    title: "Join Event"
  };
  
  axios.get('http://localhost:3000/findEvent', { params: { id: req.query.id }})
    .then(function(eventData){
        res.render("joinPage", { event : eventData.data, pageDetails})
    })
    .catch(err =>{
        res.send(err);
    })
}
