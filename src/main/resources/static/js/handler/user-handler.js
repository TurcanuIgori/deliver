// this handler will show modal window and populate it with data from user by given user
function toogleModalToUpdateUser(userId) {
    console.log('Handle chick on the update button with id: ' + userId);
    findUserById(userId, completeModalWindow);
}

// this method is used to complete fields from modal windows with data about user
function completeModalWindow(data, textStatus) {
    console.log(data);
    $('#userID').val(data.id);
    $('#firstName').val(data.firstName);
    $('#lastName').val(data.lastName);
    $('#username').val(data.username);
    // $('#username').attr('disabled', 'true');
    $('#email').val(data.email);
    if (data.address) {
        $('#addressID').val(data.address.id);
        $('#street').val(data.address.street);
        $('#city').val(data.address.city);
        $('#region').val(data.address.region);
        $('#country').val(data.address.country);
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
    $('#' + data.role.name).attr('selected', 'selected');
}
$(document).ready(function () {
    $("#btnSubmit").click(function (event) {
        // stop submit the form, we will post it manually.
        event.preventDefault();
        saveUserHandler();
    });
});

function saveUserHandler() {
    var user = {
        id: '1',
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        username: $('#username').val(),
        dob: $('#dob').val(),
        email: $('#email').val(),
        role: {
            id: "1"
        },
        address: {
            id: "1"
        },
        gender: $('#genderF:checked').val(),
        password: $('#password').val(),
        repeatPassword: $('#repeatPassword').val(),
        active: $('#active:checked').val()
        // @TODO get picture
    };
    if (user.gender == undefined) {
        user.gender = 'M';
    } else {
        user.gender = 'F';
    }
    if (user.active == 'on') {
        user.active = true;
    } else {
        user.active = false;
    }
    var data = new FormData($('#userSaveForm')[0]);
    var picture = $('#picture')[0];
    // if exist id update use  r else create new user
    if (user.id) {
        console.log(data);
        updateUser(data, userSavedAction)
    } else {
        console.log(data);
        createUser(data, userSavedAction);
    }
}

function userSavedAction(res) {
    console.log(res);
}

// this handler will show popup window to ask user if he really need to delete this user
function toogleModalToDeleteUser(userId) {
    console.log('Handle chick on the delete button with id: ' + userId);
    deleteUserById(userId, userDeletedAction);
}

function userDeletedAction(res) {
    console.log(res);
}

// this handler will show the modal window with form to create new user
function toogleModalToCreateUser() {
    console.log('Handle chick to show modal window for craete new user');
}