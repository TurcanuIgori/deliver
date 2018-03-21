var errCallback = function(){
    alert('There has been a database error!');
};

// initialize databe
var db = openDatabase('mdegree', "1.0", 'Database for delivery app!', 5*1024*1024, createTables);

// initialize tables
function createTables() {
    db.transaction(function (transaction) {
        transaction.executeSql("CREATE TABLE IF NOT EXISTS commands (" +
            "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
            "deliver_id INTEGER," +
            "market_id INTEGER);");
        transaction.executeSql("CREATE IF NOT EXIST command_products (" +
            "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
            "quantity INTEGER," +
            "product_id INTEGER);");
        transaction.executeSql("CREATE IF NOT EXIST commands_command_products (" +
            "command_id INTEGER NOT NULL," +
            "command_product_id);");
    });
}

// insert given object in Web SQL if {@param command#id} is null else try to update it
var insertCommandInLocalDB = function (command, callback) {
    if (command.id) {
        updateCommandInLocalDB(command);
    }
    alert('Command has been inserted');
    db.transaction(function(transaction){
        transaction.executeSql(("INSERT INTO commands (deliver_id, market_id) VALUES (?, ?);"),
            [command.deliver.id, command.market.id], function(transaction, results){saveCommandProduct(command, results);}, errCallback);
    });
};

var saveCommandProduct = function(command, commandId) {
    for (var i = 0; i < command.commandProducts.length; i++) {
        db.transaction(function(transaction){
            transaction.executeSql(("INSERT INTO command_products (quantity, product_id) VALUES (?, ?);"),
                [command.commandProducts[i].quantity, command.commandProducts[i].product.id], function(transaction, results){saveBinding(commandId, results);}, errCallback);
        });
    }
};

var saveBinding = function(commandId, results) {
    db.transaction(function(transaction){
        transaction.executeSql(("INSERT INTO commands_command_products (command_id, command_product_id) VALUES (?, ?);"),
            [commandId, results], function(transaction, results){console.log(results);}, errCallback);
    });
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

// load command by Id
var loadCommandById = function(commandId){
    db.transaction(function(transaction){
        transaction.executeSql(("SELECT * FROM commands WHERE id=?"), [commandId],
            function(transaction, results){successCallback(results);}, errCallback);
    });
};