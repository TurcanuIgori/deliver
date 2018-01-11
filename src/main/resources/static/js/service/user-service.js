// GET - /users/ - get all users
function findAllUsers(callback) {
    $.ajax({
        url: "users/",
        async: true,
        success: function (res, textStatus) {
            callback(res);
        },
        error: function (err) {
            console.error('Hudson, we have a problem....server respose status is: '+ err.status);
        }
    });
}

// GET - /users/ - find user by id
function findUserById(id, callback) {
    $.ajax({
        url: "users/" + id,
        async: true,
        success: function (res, textStatus) {
            callback(res);
        },
        error: function (res, textStatus) {
            callback(res);
        }
    });
}

// DELETE - /users/- delete user by id
function deleteUserById(id, callback) {
    $.ajax({
        url: "users/" + id,
        method: 'DELETE',
        success: function (res, textStatus) {
            callback(res);
        },
        error: function (res, textStatus) {
            callback(res);
        }
    });
}

// updateUser(user) PUT
function updateUser(user, callback) {
    $.ajax({
        url: 'users/',
        type : 'PUT',
        enctype: 'multipart/form-data',
        data: user,
        // prevent jQuery from automatically transforming the data into a query string
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function (res, textStatus) {
            callback(res, textStatus);
        },
        error: function (res, textStatus) {
            callback(res, textStatus);
        }
    });
}

// craeteUser(newUser) POST
function createUser(newUser, callback) {
    $.ajax({
        url: 'users/',
        type : 'POST',
        enctype: 'multipart/form-data',
        data: newUser,
        // prevent jQuery from automatically transforming the data into a query string
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function (res, textStatus) {
            callback(res, textStatus);
        },
        error: function (res, textStatus) {
            callback(res, textStatus);
        }
    });
}