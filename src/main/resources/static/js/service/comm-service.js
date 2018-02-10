// GET - /comms/ - get all commands dependently by current authorized role
function findAllCommands(callback) {
    $.ajax({
        url: 'commands/',
        // async: true,
        method: 'GET',
        success: function (res, textStatus) {
            console.log(res);
            callback(res);
        },
        error: function (err) {
            console.log(err.responseText);
            console.error('Hudson, we have a problem....server respose status is: '+ err.status);
        }
    });
}

// GET - /comms/ - find command by id
function findCommandById(id, callback) {
    $.ajax({
        url: 'commands/' + id,
        async: true,
        type: 'GET',
        success: function (res, textStatus) {
            callback(res);
        },
        error: function (res, textStatus) {
            findAllCommands(function (commands) {
                for (i = 0; i < commands.length; i++) {
                    var command = commands[i];
                    if (command.id == id) {
                        callback(command);
                        return;
                    }
                }
            });
        }
    });
}

// DELETE - /comms/- delete command by id
function deleteCommandById(id, callback) {
    $.ajax({
        url: "commands/" + id,
        type: 'DELETE',
        success: function (res, textStatus) {
            callback(res, textStatus);
        },
        error: function (res, textStatus) {
            callback(res);
        }
    });
}

// PUT - /comms/ - update command
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

// POST - /comms/ - create command
function createCommand(data, callback) {
    $.ajax({
        url: 'commands',
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
