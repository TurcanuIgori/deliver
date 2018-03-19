function prepareDatabase(ready, error) {
    return openDatabase('commands', '1.0', 'Offline document storage', 5*1024*1024, function (db) {
        db.changeVersion('', '1.0', function (t) {
            t.executeSql('CREATE TABLE docids (id, name)');
        }, error);
    });
}
// insert given object in Web SQL if {@param command#id} is null else try to update it
var insertCommandInLocalDB = function (command, callback) {
    if (command.id) {
        updateCommandInLocalDB(command);
    }
    alert('Command has been inserted');
    // get Web SQL transaction
    // execute insert query
    callback('success');
};

// if {@param command} exist in Web SQL, this function will update it with given parameter else will create it
function updateCommandInLocalDB(command, callback) {
    if (!command.id) {
        insertCommandInLocalDB(command);
    }
    alert('Command has been updated');
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
    alert('Command has been deleted!');
    // get Web SQL transaction
    // delete object
    callback('success');
}

var errCallback = function(){
    alert('There haz bin a database error!');
};

// Open / initialise the db - this will fail in browsers like Firefox & IE
var db = openDatabase('mdegree', "1.0", "Winkles Of The World", 32678);

// Create winkles table if required
db.transaction(function(transaction){
    transaction.executeSql("CREATE TABLE IF NOT EXISTS commands (" +
        "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
        "winklename TEXT NOT NULL, location TEXT NOT NULL);");
});

// This is the SAVE function
var saveWinkle = function(winklename, location, successCallback){
    db.transaction(function(transaction){
        transaction.executeSql(("INSERT INTO winkles (winklename, location) VALUES (?, ?);"),
            [winklename, location], function(transaction, results){successCallback(results);}, errCallback);
    });
};

// This is a LOAD function, which pulls all winkles for a given location
var loadWinkles = function(location, successCallback){
    db.transaction(function(transaction){
        transaction.executeSql(("SELECT * FROM winkles WHERE location=?"), [location],
            function(transaction, results){successCallback(results);}, errCallback);
    });
};