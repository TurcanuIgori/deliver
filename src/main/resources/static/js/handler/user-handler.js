// pagination configuration
var paginationConfig = {
    perPage: 5,
    showPrev: false,
    showNext: true,
    selectedPage: 1,
    numberOfPages: 2,

};

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
    $('#dob').val(data.dobAsString);
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

// handle the submit user form
$(document).ready(function () {
    $("#btnSubmit").click(function (event) {
        // stop submit the form, we will post it manually.
        event.preventDefault();
        saveUserHandler();
    });
});

function saveUserHandler() {
    if (validateUserForm()) {
        var data = new FormData($('#userSaveForm')[0]);
        // if exist id update use  r else create new user
        if ($('#userID').val()) {
            updateUser(data, userSavedAction)
        } else {
            createUser(data, userSavedAction);
        }
    }
}

function userSavedAction(res, status) {
    if (status == 'success') {
        $('#exampleModal').modal('toggle');
    }
}

// this handler will show popup window to ask user if he really need to delete this user
function toogleModalToDeleteUser(userId) {
    resetUserForm();
    console.log('Handle chick on the delete button with id: ' + userId);
    deleteUserById(userId, userDeletedAction);
}

function userDeletedAction(res) {
    console.log(res);
}

function getUsersForSelectedPage(selectedPageNumber) {
  console.log('Pagination is in progres...');
}
function toogleModalToCreateUser() {
    resetUserForm();
}
// @TODO implement the reset method for save user form
// @TODO implement the validation for save user form

function resetUserForm() {
    $('#userID').val('');
    $('#firstName').val('');
    $('#lastName').val('');
    $('#username').val('');
    $('#email').val('');
    $('#addressID').val('');
    $('#street').val('');
    $('#city').val('');
    $('#region').val('');
    $('#country').val('');
    $('#dob').val('');
    $('#password').val('');
    $('#repeatPassword').val('');
    $('#picture').val('');
    $('#active').removeAttr('checked');
    $('#genderM').removeAttr('checked');
    $('#genderF').removeAttr('checked');
    $('#ROLE_ADMIN').removeAttr('selected');
    $('#ROLE_USER').removeAttr('selected');
    $('#ROLE_NONE').attr('selected', 'selected');
}

function validateUserForm() {

    var firstNameValue = $('#firstName').val();
    if (!firstNameValue) {
        $('#firstNameHelper').text('First Name is must.');
        console.log('First Name is must.');
        return false;
    } else {
        $('#firstNameHelper').text('');
    }
    if (firstNameValue.length > 20 || firstNameValue.length < 3) {
        $('#firstNameHelper').text('Length must be between 3 and 20 characters.');
        console.log('Length must be between 3 and 20 characters.');
        return false;
    } else {
        $('#firstNameHelper').text('');
    }

    var lastNameValue = $('#lastName').val();
    if (!lastNameValue) {
        $('#lastNameHelper').text('Last Name is must.');
        console.log('Last Name is must.');
        return false;
    } else {
        $('#lastNameHelper').text('');
    }
    if (lastNameValue.length > 20 || lastNameValue.length < 3) {
        $('#lastNameHelper').text('Length must be between 3 and 20 characters.');
        console.log('Length must be between 3 and 20 characters.');
        return false;
    } else {
        $('#lastNameHelper').text('');
    }

    var emailRegex = new RegExp('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])');
    var emailValue = $('#email').val();
    if (!emailRegex.test(emailValue)) {
        $('#emailHelper').text("Check email validation.");
        console.log("Check email validation.");
        return false;
    } else {
        $('#emailHelper').text("");
    }
    if (emailValue.length > 20 || emailValue < 3) {
        $('#emailHelper').text('Length must be between 3 and 20 characters.');
        console.log('Length must be between 3 and 20 characters.');
        return false;
    } else {
        $('#emailHelper').text('');
    }

    var usernameValue = $('#username').val();
    if (!usernameValue) {
        $('#usernameHelper').text('Username is must.');
        console.log('Username is must.');
        return false;
    } else {
        $('#usernameHelper').text('');
    }
    if (usernameValue.length > 20 || usernameValue.length < 3) {
        $('#usernameHelper').text('Length must be between 3 and 20 characters.');
        console.log('Length must be between 3 and 20 characters.');
        return false;
    } else {
        $('#usernameHelper').text('');
    }

    var dobRegexPattern = new RegExp('^[0-9]{4}[\\-][0-9]{2}[\\-][0-9]{2}$');
    var dobValue = $('#dob').val();
    if (!dobValue) {
        $('#dobHelper').text('Date of Birth is must.');
        console.log('DOB is must.');
        return false;
    } else {
        $('#dobHelper').text('');
    }
    if (!dobRegexPattern.test(dobValue)) {
        console.log(dobValue);
        $('#dobHelper').text('DOB pattern should be like this: YYYY-MM-DD.');
        console.log('DOB pattern should be like this: YYYY-MM-DD.');
        return false;
    } else {
        $('#dobHelper').text('');
    }

    var genderFValue = $('#genderF').val();
    var genderMValue = $('#genderM').val();
    if (!genderFValue && !genderMValue) {
        $('genderHelper').text('Gender is must.');
        console.log('Gender is must.');
        return false;
    } else {
        $('genderHelper').text('');
    }

    if (!$('#userID').val()) {
        var passwordValue = $('#password').val();
        var repeatPasswordValue = $('#repeatPassword').val();
        if (!passwordValue) {
            $('#passwordHelper').text('Password is must.');
            console.log('Password is must.');
            return false;
        } else {
            $('#passwordHelper').text('');
        }
        if (passwordValue.length > 20 || passwordValue.length < 3) {
            $('#passwordHelper').text('Length must be between 3 and 20 characters.');
            console.log('Length must be between 3 and 20 characters.');
            return false;
        } else {
            $('#passwordHelper').text('');
        }
        if (passwordValue != repeatPasswordValue) {
            $('#passwordHelper').text('Passwords doesn\'t match.');
            console.log('Passwords doesn\'t match.');
            return false;
        } else {
            $('#passwordHelper').text('');
        }
    }

    return true;
}