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
    let email = req.url.slice(req.url.indexOf('=') + 1)
    res.render('auth/register', { email: email, display: 'none' })
  },

  loginSubmit: (req, res) => {
    username = req.body.username;
    password = req.body.password;

    for (let user of Object.keys(users)) {
      if (user == username) {
        if (users[user]['username'] == username && users[user]['password'] == password) {
          req.session['user'] = username
          response.redirect('/reminders') 
        }
        else {
          console.log("Invalid credentials")
        }
      }
      else {
        return console.log('No user exists')
      }
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
    res.redirect('/login')
  }
}



module.exports = authController;
