const express = require("express");
app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const cookieSession = require("cookie-session");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");
let {users} = require("./userdb");
const {authorization} = require("./middleware/auth");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/images")))

app.use(express.urlencoded({ extended: false }));

app.use(ejsLayouts);

app.use(cookieSession({
  name:"session",
  keys: ['aaa', 'bbb', 'ccc'],
}))

app.use(function(req, res, next){
  if(req.session.user){
    if(users[req.session.user]){
      req.user = users[req.session.user]
      next();
    }
    else{
      next()
    }
  }
  else{
    next()
  }
})

app.set("view engine", "ejs");

// Routes start here

app.get("/reminders", authorization, reminderController.list)

app.get("/reminder/new", authorization,reminderController.new)

app.get("/reminder/:id", authorization, reminderController.listOne)

app.get("/reminder/:id/edit", authorization, reminderController.edit)

app.post("/reminder/", reminderController.create)

app.post("/reminder/update/:id", reminderController.update)

app.post("/reminder/delete/:id", reminderController.delete)

app.get("/register", authController.register);
app.get("/login", authController.login);
app.post("/register", authController.registerSubmit);
app.post("/login", authController.loginSubmit);
app.post("/logout", authController.logout);


app.listen(3001, function () {
  console.log("Server running. Visit: localhost:3001/reminders in your browser 🚀");
});
