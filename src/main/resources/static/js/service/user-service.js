// findAllUsers() GET

// findUserById(userId, callback) GET
function findUserById(id, callback) {
    $.ajax({
        url: "users/" + id,
        async: true,
        success: function (res, textStatus) {
            callback(res);
        },
        error: function (err) {
            console.error('Hudson, we have a problem....server respose status is: '+ err.status);
        }
    });
}

// deleteUserById(userId) DELETE
// updateUser(user) PUT
// craeteUser(newUser) POST
