var errCallback = function (err, err1) {
    console.log(err, err1);
};

// initialize database
var db = openDatabase('delivery', "1.0", 'Database for delivery app!', 5 * 1024 * 1024, createTables);

// initialize tables
function createTables() {
    console.log('Crearea tabelelor...');
    db.transaction(function (trx) {
        trx.executeSql("CREATE TABLE IF NOT EXISTS commands (" +
            "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
            "command_id INTEGER, " +
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
    db.transaction(function (trx) {
        trx.executeSql("CREATE TABLE users (" +
            "id INTEGER, " +
            "firstName String, " +
            "lastName String, " +
            "street_id INTEGER);");
    });
    db.transaction(function (trx) {
        trx.executeSql("CREATE TABLE groups (" +
            "id INTEGER, " +
            "name String);");
    });
    db.transaction(function (trx) {
        trx.executeSql("CREATE TABLE markets (" +
            "id INTEGER, " +
            "name String, " +
            "owner_id INTEGER, " +
            "street_id INTEGER);");
    });
    db.transaction(function (trx) {
        trx.executeSql("CREATE TABLE streets (" +
            "id INTEGER, " +
            "name String, " +
            "city_id INTEGER);");
    });
    db.transaction(function (trx) {
        trx.executeSql("CREATE TABLE cities (" +
            "id INTEGER, " +
            "name String, " +
            "country_id INTEGER);");
    });
    db.transaction(function (trx) {
        trx.executeSql("CREATE TABLE countries (" +
            "id INTEGER, " +
            "name String);");
    });
    db.transaction(function (trx) {
        trx.executeSql("CREATE TABLE products (" +
            "id INTEGER, " +
            "price float, " +
            "total_quantity INTEGER, " +
            "group_id INTEGER);");
    });
    sincronizeTables();
}

// insert given object in Web SQL if {@param command#id} is null else try to update it
var insertCommandInLocalDB = function (command, callback) {
    if (command.id) {
        updateCommandInLocalDB(command);
    }
    if (!command.id) {
        command.id = 0;
    }
    db.transaction(function (transaction) {
        transaction.executeSql(("INSERT INTO commands (command_id, deliver_id, market_id) VALUES (?, ?, ?);"),
            [command.id, command.deliver.id, command.market.id], function (transaction, results) {
                saveCommandProduct(command, results.insertId, callback);
            }, errCallback);
    });
};

var saveCommandProduct = function (command, commandId, callback) {
    var quantity;
    var commandProductId;
    for (var i = 0; i < command.commandProducts.length; i++) {
        quantity = command.commandProducts[i].quantity;
        commandProductId = command.commandProducts[i].product.id;
        db.transaction(function (transaction) {
            transaction.executeSql(("INSERT INTO command_products (quantity, product_id) VALUES (?, ?);"),
                [quantity, commandProductId], function (transaction, results) {
                    saveBinding(commandId, results, callback);
                }, errCallback);
        });
    }
};

var saveBinding = function (commandId, results, callback) {
    db.transaction(function (transaction) {
        transaction.executeSql(("INSERT INTO commands_command_products (command_id, command_product_id) VALUES (?, ?);"),
            [commandId, results.insertId], function (transaction, res) {
                console.log(res);
            }, errCallback);
    });
    db.transaction(function (transaction) {
        transaction.executeSql(("INSERT INTO commands_command_products (command_id, command_product_id) VALUES (?, ?);"),
            [commandId, results.insertId], function (transaction, res) {
                loadCommandById(commandId, callback);
            }, errCallback);
    });
};

/**
 * {deliver: {id: 1}, market: {id: 2}, commandProducts: [{quantity: 5, product: {id: 1}}, {quantity: 10, product: {id: 2}}]}
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

// load command by Id
var loadCommandById = function (commandId, successCallback) {
    db.transaction(function (transaction) {
        transaction.executeSql(("SELECT * FROM commands WHERE id=?"), [commandId],
            function (transaction, results) {
                successCallback('', '', results);
            }, errCallback);
    });
};

var deleteCommandFromLocalDB = function (commandId, callback) {
    db.transaction(function (transaction) {
        transaction.executeSql(("INSERT INTO commands (command_id, deleted) VALUES (?, ?);"),
            [commandId, 'TRUE'], function (transaction, results) {
                console.log('Command has been deleted');
            }, errCallback);
    });
};

var deleteAllFromTables = function () {
    db.transaction(function (transaction) {
        transaction.executeSql(("DELETE FROM commands"), [],
            function (trx) {
                trx.executeSql(("DELETE FROM commands_command_products"), [],
                    function (transaction, results) {
                        transaction.executeSql(("DELETE FROM command_products"), [],
                            function (transaction, results) {
                            }, errCallback);
                    }, errCallback);
            }, errCallback);
    });
};

function syncronizeDeletedCommands() {
    db.transaction(function (trx) {
        trx.executeSql('SELECT commands.command_id FROM commands WHERE commands.deleted = "TRUE";',
            [], function (trx, res) {
                let commandsValues = res.rows,
                    commandIds = [];
                for (let i = 0; i < commandsValues.length; i++) {
                    commandIds.push(commandsValues.item(i).command_id);
                }
                if (commandIds) {
                    $.ajax({
                        url: 'delete-commands',
                        type: 'POST',
                        contentType: 'application/json;charset=utf-8',
                        data: JSON.stringify(commandIds),
                        success: function (res, textStatus) {
                            deleteAllFromTables();
                            location.reload();
                        },
                        error: function (res, textStatus) {
                            deleteAllFromTables();
                            console.log(res, textStatus);
                        }
                    });
                }
            }, errCallback)
    });
}

function startSynchronizationProcess(trx, res) {
    let commandsValues = res.rows,
        resNumber = res.rows.length,
        commands = [];
    if (commandsValues) {
        for (let i = 0; i < commandsValues.length; i++) {
            let commandValue = res.rows.item(i),
                command = {
                    deliver: {
                        id: commandValue.deliver_id
                    },
                    market: {
                        id: commandValue.market_id
                    },
                    commandProducts: [
                        {
                            quantity: commandValue.quantity,
                            product: {
                                id: commandValue.product_id
                            }
                        }
                    ]
                };
            commands.push(command)
        }
        console.log(commandsValues, commands);
        $.ajax({
            url: 'syncronize-commands',
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(commands),
            success: function (res, textStatus) {
                console.log(res, textStatus);
                syncronizeDeletedCommands();
            },
            error: function (res, textStatus) {
                console.log(res, textStatus);
            }
        });
    }
}

function updateOnlineStatus() {
    console.log('Synchronization process has been started...');
    var isNavigatorOnline = navigator.onLine;
    if (isNavigatorOnline) {
        db.transaction(function (trx) {
            trx.executeSql('SELECT commands.deliver_id, commands.market_id, commands.deleted, command_products.quantity, command_products.product_id FROM commands ' +
                'INNER JOIN commands_command_products ON commands.id == commands_command_products.command_id ' +
                'INNER JOIN command_products ON commands_command_products.command_product_id == command_products.id WHERE commands.deleted = "FALSE";',
                [], startSynchronizationProcess, errCallback)
        });
    }
}

function sincronizeTables() {
    $.ajax({
        url: '/users/getDataForSyncronize',
        type: 'GET',
        contentType: 'application/json;charset=utf-8',
        success: function (res, textStatus) {
           console.log(res, textStatus)
        },
        error: function (res, textStatus) {
            console.log(res, textStatus);
        }
    });
}