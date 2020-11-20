let database = require("../database");

let authController = {
  login: (req, res) => {
    res.render('auth/login', {display: 'none'})
  },

  register: (req, res) => {
    let email = req.url.slice(req.url.indexOf('=')+1)
    res.render('auth/register', {email:email, display: 'none'})
  },

  loginSubmit: (req, res) => {
    // implement
  },

  registerSubmit: (req, res) => {
    // implement
  }
}

module.exports = authController;
