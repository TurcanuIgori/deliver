// GET - /commands/ - get all commands dependently by current authorized role
function findAllCommands(callback) {
    $.ajax({
        url: "commands/",
        async: true,
        success: function (res, textStatus) {
            callback(res);
        },
        error: function (err) {
            console.error('Hudson, we have a problem....server respose status is: '+ err.status);
        }
    });
}
// GET - /commands/ - find command by id
function findCommandById(id, callback) {
    $.ajax({
        url: "commands/" + id,
        async: true,
        success: function (res, textStatus) {
            callback(res);
        },
        error: function (res, textStatus) {
            callback(res);
        }
    });
}

// DELETE - /commands/- delete command by id
function deleteCommandById(id, callback) {
    $.ajax({
        url: "commands/" + id,
        method: 'DELETE',
        success: function (res, textStatus) {
            callback(res, textStatus);
        },
        error: function (res, textStatus) {
            callback(res);
        }
    });
}

// PUT - /commands/ - update command
function updateCommand(data, callback) {
    $.ajax({
        url: 'commands/',
        type : 'PUT',
        data: JSON.stringify(data),
        contentType: "application/json;charset=utf-8",
        success: function (res, textStatus) {
            callback(res, textStatus);
        },
        error: function (res, textStatus) {
            callback(res, textStatus);
        }
    });
}

// POST - /commands/ - create command
function createCommand(data, callback) {
    $.ajax({
        url: 'commands/',
        type : 'POST',
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(data),
        success: function (res, textStatus) {
            callback(res, textStatus);
        },
        error: function (res, textStatus) {
            callback(res, textStatus);
        }
    });
}
