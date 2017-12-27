// var userService = require('../service/user-service.js');

// this handler will show modal window and populate it with data from user by given user
function toogleModalToUpdateUser(userId) {
    console.log('Handle chick on the update button with id: ' + userId);
    var user = findUserById(userId);
    console.log(user);
}

// this handler will show popup window to ask user if he really need to delete this user
function toogleModalToDeleteUser(userId) {
    console.log('Handle chick on the delete button with id: ' + userId);
}

// this handler will show the modal window with form to create new user
function toogleModalToCreateUser() {
    console.log('Handle chick to show modal window for craete new user');
}