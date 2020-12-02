# Reminder App
Team Members: Shivar Pillay, Varinder Saini, Jeremiah David, Garvit Kamboj

Our code follows the same structure and principle as the MVC model however the models component is changed to include other components such as public and middleware
* View - contains the EJS pages for the various tabs that can be clicked to access new pages such as login, registration, edit, update, create and so on
* Controller - Takes the input from the various EJS pages and runs them through their respective functions such as authentication, registration, editing, creating, and so.
* Public - holds the files for static server portion of the application (the land page)
* Remaining files hold the information about the applications fake database, fake user database, and the main file that starts the application (index.js)
* Other - Other files that do not go under the above mentioned options are the node modules that will be needed to run the application, other files that help make the application run more easily(package.json)  

## Installation
Install nodejs (https://nodejs.org/en/download/)

Install git (https://git-scm.com/)

Cloning the Repository
```
$ cd /{existing directory}
$ git clone https://github.com/Reminder-App-Project/ACIT-2520.git
```

To run:
```
npm install
npm start
```

## Unfinished sprint(s)
Add a Friend
Sprint 4: (1) You could accomplish this by having a page which shows all registered users, and a button next to each user that says: "Add friend". When you click this button, it should add that friend to your friend’s list in your fake db, and you should be able to see all of their reminders on your reminder list page. You can delete them as a friend from the same page, and their reminders should no longer show up on your page. When you display reminders that are from a friend, their profile picture should be included inside the reminder box. You could alternatively accomplish this by having an input that lets you type the username/email of a friend, and when you submit, it adds that friend. If you do this, you need to show the user an error if they try and search for a person that doesn't exist. 


How to accomplish sprint 4 task (1): Create a new page in the application called add friends. This page would be accessed through the nav bar from a tab called add friends. The page will have an input box where the user can type in the name of the desired user they want to add. Upon clicking the add button. A function will be called that will look through the database to find the username provided by the user. If a username is found then the user will be redirected back to the reminders page which will now display the reminders of the user that was added as a friend along with the current user’s tasks at the very top. If the user name is not found the user will be alerted to try again. 
