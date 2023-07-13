const jwt = require ('jsonwebtoken');
const Visitor = require ("../models/visitor");
const Admin = require('../models/admin');
const secret = 'KJB523%VJN@309UNC-NWYUJGB874I082I!*CJH';

/** VISITOR MIDDLEWARE */
    //check and verify token for visitor
const guestAuth = (req, res, next) => {
  const token = req.cookies.guestJWT;

  if (token) {
    jwt.verify (token, secret, (err, decodedToken) => {
      if (err) {
        console.log (err.message);
        res.redirect ('/guestForm');
      }
      else {
        console.log (decodedToken);
        next();
      }
    })
  }
  else {
    res.redirect ('/guestForm');
  }
}

    //check guest
const checkGuest = (req, res, next) => {
  const token = req.cookies.guestJWT;

  if (token) {
    jwt.verify (token, secret, async (err, decodedToken) => {
      if (err) {
        console.log (err.message);
        res.locals.guest = null;
        next();
      }
      else {
        console.log (decodedToken);
        let guest = await Visitor.findById(decodedToken.id);
        res.locals.guest = guest;
        next();
      }
    })
  }
  else {
    res.locals.guest = null;
    next();
  }
}
/** VISITOR MIDDLEWARE */


/** ADMIN MIDDLEWARE */
    //check and verify token for admin
const adminAuth = (req, res, next) => {
    const token = req.cookies.adminJWT;

    if (token) {
          jwt.verify (token, secret, (err, decodedToken) => {
            if (err) {
              console.log (err.message);
              res.redirect ('/adminForm');
            }
            else {
              console.log (decodedToken);
              next();
            }
          })
    }
    else {
        res.redirect ('/adminForm');
    }
}
    //check admin
const checkAdmin = (req, res, next) => {
  const token = req.cookies.guestJWT;

  if (token) {
    jwt.verify (token, secret, async (err, decodedToken) => {
      if (err) {
        console.log (err.message);
        res.locals.admin = null;
        next();
      } else {
        console.log (decodedToken);
        let admin = await Admin.findById(decodedToken.id);
        res.locals.admin = admin;


        // await Admin.findById(decodedToken.id)
        //   .then(admin => {
        //     res.send(admin.toJSON());
        // }).catch(err => {
        //   console.log(err);
        // })

        next();
      }
    })
  }
  else {
    res.locals.admin = null;
    next();
  }
}

/** ADMIN MIDDLEWARE */


module.exports = {guestAuth, checkGuest, adminAuth, checkAdmin};