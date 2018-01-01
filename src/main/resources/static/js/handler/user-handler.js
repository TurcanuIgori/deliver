// this handler will show modal window and populate it with data from user by given user
function toogleModalToUpdateUser(userId) {
    console.log('Handle chick on the update button with id: ' + userId);
    findUserById(userId, completeModalWindow);
}

// this method is used to complete fields from modal windows with data about user
function completeModalWindow(data, textStatus) {
    console.log(data);
    $('#firstName').val(data.firstName);
    $('#lastName').val(data.lastName);
    $('#username').val(data.username);
    $('#username').attr('disabled', 'true');
    $('#email').val(data.email);
    if (data.address) {
        $('#street').val(data.address.street);
        $('#city').val(data.address.city);
        $('#region').val(data.address.region);
        $('#country').val(data.adress.country);
    }
    $('#dob').val(data.dob);
    if (data.active == true) {
        $('#active').attr('checked', "checked");
    }
    if (data.gender == 'M') {
        $('#genderM').attr('checked', "checked");
    } else {
        $('#genderF').attr('checked', "checked");
    }
}

// this handler will show popup window to ask user if he really need to delete this user
function toogleModalToDeleteUser(userId) {
    console.log('Handle chick on the delete button with id: ' + userId);
}

// this handler will show the modal window with form to create new user
function toogleModalToCreateUser() {
    console.log('Handle chick to show modal window for craete new user');
}