// insert given object in Web SQL if {@param command#id} is null else try to update it
function insertCommandInLocalDB(command, callback) {
    if (command.id) {
        update(command)
    }
    // get Web SQL transaction
    // execute insert query
    callback('success');
}

// if {@param command} exist in Web SQL, this function will update it with given parameter else will create it
function updateCommandInLocalDB(command, callback) {
    if (!command.id) {
        insert(command);
    }
    // get Web SQL transaction
        // search object by {@param command#id}
        // create object with searched object
        // update it
        // execute UPDATE query
    callback('success');
}

// delete object from Web SQL if given {@param commandId} is not null else return null
function deleteCommandFromLocalDB(commandId, callback) {
    if (!commandId) {
        return false;
    }
    // get Web SQL transaction
    // delete object
    callback('success');
}