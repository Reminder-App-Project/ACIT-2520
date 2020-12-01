const { response } = require("express");
let database = require("../database");
let { users } = require("../userdb");

function modify_reminderdb(username) {
  database[username] = { reminders: [] }
  console.log(database)
}

let authController = {
  login: (req, res) => {
    res.render('auth/login', { display: 'none' })
  },

  register: (req, res) => {
    if (req.url.includes('email')){
    let email = req.url.substr(req.url.indexOf('=')+1, req.url.length)
    res.render('auth/register', { email: email, display: 'none' })
    }
    else{
      res.render('auth/register', { email: "", display: 'none' })
    }
  },

  loginSubmit: (req, res) => {
    if (users[req.body.username] && users[req.body.username].password === req.body.password) {
      req.session['user']= req.body.username;
      res.redirect('/reminders');
    } else {
      res.render('auth/login', {message: "Invalid Match",  display: 'none' });
    }
    
    
},

  registerSubmit: (req, res) => {
    email = req.body.email
    username = req.body.username
    password = req.body.password

    if (username && password) {
      users[username] = { username: username, password: password, email: email }
      console.log(users)
      req.session['user'] = username
      res.redirect('/reminders')
    }
    else {
      res.status(400)
      res.send('Invalid User')
    }

    modify_reminderdb(username)
  },

  logout: (req, res) => {
    req.session = null
    res.redirect('/')
  }
}

module.exports = authController;
