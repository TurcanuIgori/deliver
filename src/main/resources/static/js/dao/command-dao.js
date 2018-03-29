var errCallback = function (err, err1) {
    console.log(err, err1);
};

// initialize database
var db = openDatabase('mdtest', "1.0", 'Database for delivery app!', 5 * 1024 * 1024, createTables);

// initialize tables
function createTables() {
    console.log('Crearea tabelelor...');
    db.transaction(function (trx) {
        trx.executeSql("CREATE TABLE IF NOT EXISTS commands (" +
            "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
            "deliver_id INTEGER, " +
            "market_id INTEGER, " +
            "deleted BOOLEAN DEFAULT FALSE);");
    });
    db.transaction(function (trx) {
        trx.executeSql("CREATE TABLE IF NOT EXISTS command_products (" +
            "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
            "quantity INTEGER," +
            "product_id INTEGER); ");
    });
    db.transaction(function (trx) {
        trx.executeSql("CREATE TABLE commands_command_products (" +
            "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
            "command_id INTEGER NOT NULL," +
            "command_product_id);");
    });
}

// insert given object in Web SQL if {@param command#id} is null else try to update it
var insertCommandInLocalDB = function (command, callback) {
    if (command.id) {
        updateCommandInLocalDB(command);
    }
    db.transaction(function(transaction){
        transaction.executeSql(("INSERT INTO commands (deliver_id, market_id) VALUES (?, ?);"),
            [command.deliver.id, command.market.id], function (transaction, results) {
                saveCommandProduct(command, results.insertId);
            }, errCallback);
    });
};

var saveCommandProduct = function(command, commandId) {
    var quantity;
    var commandProductId;
    for (var i = 0; i < command.commandProducts.length; i++) {
        quantity = command.commandProducts[i].quantity;
        commandProductId = command.commandProducts[i].product.id;
        db.transaction(function(transaction){
            transaction.executeSql(("INSERT INTO command_products (quantity, product_id) VALUES (?, ?);"),
                [quantity, commandProductId], function (transaction, results) {
                    saveBinding(commandId, results);
                }, errCallback);
        });
    }
};

var saveBinding = function(commandId, results) {
    db.transaction(function(transaction){
        transaction.executeSql(("INSERT INTO commands_command_products (command_id, command_product_id) VALUES (?, ?);"),
            [commandId, results.insertId], function (transaction, res) {
                console.log(res);
            }, errCallback);
    });
};

/**
 * {deliver: {id: 1}, market: {id: 2}, commandProducts: [{quantity: 5, product: {id: 1}}, {quantity: 10, product: {id: 2}}]}
 * @param command
 * @param callback
 */

// if {@param command} exist in Web SQL, this function will update it with given parameter else will create it
function updateCommandInLocalDB(command, callback) {
    if (!command.id) {
        insertCommandInLocalDB(command);
    }
    db.transaction(function (transaction) {
        transaction.executeSql(("UPDATE commands SET deliver_id = ?, market_id = ? WHERE id=?"), [command.deliver.id, command.market.id, command.id],
            function (transaction, results) {
            }, errCallback);
    });
    db.transaction(function (transaction) {
        transaction.executeSql(("DELETE FROM commands_command_products WHERE command_id  = ?;"), [command.id],
            function (transaction, results) {
            }, errCallback);
    });
    saveCommandProduct(command, command.id);
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
var loadCommandById = function (commandId, successCallback) {
    db.transaction(function(transaction){
        transaction.executeSql(("SELECT * FROM commands WHERE id=?"), [commandId],
            function(transaction, results){successCallback(results);}, errCallback);
    });
};

var deleteCommandById = function(commandId, callback) {
    db.transaction(function (transaction) {
        transaction.executeSql(("UPDATE commands SET deleted='true' WHERE id=?"), [commandId],
            function (transaction, results) {
                callback(results);
            }, errCallback);
    });
};

var deleteAllFromTables = function () {
    db.transaction(function (transaction) {
        transaction.executeSql(("DELETE FROM commands"), [],
            function (transaction, results) {
            }, errCallback);
    });

    db.transaction(function (transaction) {
        transaction.executeSql(("DELETE FROM commands_command_products"), [],
            function (transaction, results) {
            }, errCallback);
    });

    db.transaction(function (transaction) {
        transaction.executeSql(("DELETE FROM command_products"), [],
            function (transaction, results) {
            }, errCallback);
    });
};