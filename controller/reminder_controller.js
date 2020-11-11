let database = require("../database");

let remindersController = {
  // Show a list of reminders
  list: (req, res) => {
    res.render('reminder/index', { reminders: database.cindy.reminders })
  },

  // Show a Create Reminder Page
  new: (req, res) => {
    res.render('reminder/create')
  },

  // Show the details of a Single Reminder
  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    })
    if (searchResult != undefined) {
      res.render('reminder/single-reminder', { reminderItem: searchResult })
    } else {
      res.render('reminder/index', { reminders: database.cindy.reminders })
    }
  },

  // Create a reminder
  // ⚠️ TODO: Currently hardcoded to always create a reminder for Cindy only. You need to make this dynamic. 
  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false
    }
    database.cindy.reminders.push(reminder);
    console.log(reminder);
    res.redirect('/reminders');
  },

  // Show the Edit Reminder Page
  edit: (req, res) => {
    // ⭐️ your implementation here ⭐️
    let reminderItem = database.cindy.reminders.find(function (reminder) {
      let ReminderObject = {
        id: reminder.id,
        title: reminder.title,
        description: reminder.description,
        completed: false
      }
      return (ReminderObject);
    })

    res.render('reminder/edit', { reminderItem: reminderItem})
  },

  // Edit the Reminder
  update: (req, res) => {
    // ⭐️ your implementation here ⭐️
    let reminder = {
      id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed == 'true'
    }

    console.log(reminder.completed)

    database.cindy.reminders.splice(reminder.id -1, reminder.id);
    database.cindy.reminders.unshift(reminder);

    res.redirect('/reminders');
  },

  // Delete the Reminder
  // ⭐️ your implementation here ⭐️
  delete: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length,
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed
    }
    database.cindy.reminders.splice(reminder.id -1, reminder.id);

    res.redirect('/reminders');
  }
}

module.exports = remindersController;
