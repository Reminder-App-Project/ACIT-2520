const { request } = require("express");
const fetch = require("node-fetch");
let database = require("../database");

let remindersController = {
  list: (req, res) => {
    res.render('reminder/index', { reminders: database[req.session.user].reminders, condition_list: 'active', condition_new: '', user: req.session.user })
  },

  new: (req, res) => {
    res.render('reminder/create', { condition_list: '', condition_new: 'active' })
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database[req.session.user].reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    })
    if (searchResult != undefined) {
      res.render('reminder/single-reminder', { reminderItem: searchResult })
    } else {
      res.render('reminder/index', { reminders: database[req.session.user].reminders })
    }
  },

  create: (req, res) => {
    fetch(`https://api.unsplash.com/search/photos/?client_id=A_ophHr52gAI4iPOMNGtznx4jgOfcA9DASTV8_aKYU8&query=${req.body.image}`)
      .then((response) => {
        response.json()
          .then((data) => {
            return data.results
          })
          .then((data) => {
            let reminder = {
              id: database[req.session.user].reminders.length + 1,
              title: req.body.title,
              description: req.body.description,
              completed: false,
              tags: req.body.tags.split(","),
              subtasks: req.body.subtasks.split(","),
              image: data[0].urls.small
            }
            database[req.session.user].reminders.push(reminder);
            console.log(reminder)
            console.log(database)
            res.redirect('/reminders');
          })
          .catch((err) => {
            console.log(err)
          })
      }).catch((err) => {
        console.log(err)
      })
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database[req.session.user].reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    })
    res.render('reminder/edit', { reminderItem: searchResult })

  },

  update: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database[req.session.user].reminders.find(function (reminder) {
      if (reminder.id == reminderToFind) {
        reminder.title = req.body.title,
          reminder.description = req.body.description,
          reminder.tags = req.body.tags.split(","),
          reminder.subtasks = req.body.subtasks.split(","),
          reminder.completed = req.body.completed == "true"
      }
    });
    res.redirect('/reminders')
  },

  delete: (req, res) => {
    let reminderToFind = req.params.id;
    let reminderIndex = database[req.session.user].reminders.findIndex(function (reminder) {
      return reminder.id == reminderToFind;
    })
    database[req.session.user].reminders.splice(reminderIndex, 1);
    res.redirect('/reminders');
  }
}

module.exports = remindersController;
