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
            "users_id INTEGER, " +
            "firstName String, " +
            "lastName String, " +
            "street_id INTEGER);");
    });
    db.transaction(function (trx) {
        trx.executeSql("CREATE TABLE groups (" +
            "groups_id INTEGER, " +
            "name String);");
    });
    db.transaction(function (trx) {
        trx.executeSql("CREATE TABLE markets (" +
            "markets_id INTEGER, " +
            "name String, " +
            "owner_id INTEGER, " +
            "street_id INTEGER);");
    });
    db.transaction(function (trx) {
        trx.executeSql("CREATE TABLE streets (" +
            "streets_id INTEGER, " +
            "name String, " +
            "city_id INTEGER);");
    });
    db.transaction(function (trx) {
        trx.executeSql("CREATE TABLE cities (" +
            "cities_id INTEGER, " +
            "name String, " +
            "country_id INTEGER);");
    });
    db.transaction(function (trx) {
        trx.executeSql("CREATE TABLE countries (" +
            "countries_id INTEGER, " +
            "name String);");
    });
    db.transaction(function (trx) {
        trx.executeSql("CREATE TABLE products (" +
            "products_id INTEGER, " +
            "name String, " +
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
    } else {
        command.id = 0;
        db.transaction(function (transaction) {
            transaction.executeSql(("INSERT INTO commands (command_id, deliver_id, market_id) VALUES (?, ?, ?);"),
                [command.id, command.deliver.id, command.market.id], function (transaction, results) {
                    saveCommandProduct(command, results.insertId, callback);
                }, errCallback);
        });
    }
};

var saveCommandProduct = function (command, commandId, callback) {
    var quantity;
    var commandProductId;

    command.commandProducts.forEach(commandProduct => {
        quantity = commandProduct.quantity;
        commandProductId = commandProduct.product.id;
        db.transaction(function (transaction) {
            transaction.executeSql(("INSERT INTO command_products (quantity, product_id) VALUES (?, ?);"),
                [quantity, commandProductId], function (transaction, results) {
                    saveBinding(commandId, results, callback);
                }, errCallback);
        });
    });


    // for (var i = 0; i < command.commandProducts.length; i++) {
    //     quantity = command.commandProducts[i].quantity;
    //     commandProductId = command.commandProducts[i].product.id;
    //     db.transaction(function (transaction) {
    //         transaction.executeSql(("INSERT INTO command_products (quantity, product_id) VALUES (?, ?);"),
    //             [quantity, commandProductId], function (transaction, results) {
    //                 saveBinding(commandId, results, callback);
    //             }, errCallback);
    //     });
    // }
};

var saveBinding = function (commandId, results, callback) {
    db.transaction(function (transaction) {
        transaction.executeSql(("INSERT INTO commands_command_products (command_id, command_product_id) VALUES (?, ?);"),
            [commandId, results.insertId], function (transaction, res) {
                $('#exampleModal').modal('toggle');
                console.log('before load cmm by Id', commandId);
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
    } else {
        db.transaction(function (transaction) {
            transaction.executeSql(("INSERT INTO commands (command_id, deliver_id, market_id) VALUES (?, ?, ?);"),
                [command.id, command.deliver.id, command.market.id], function (transaction, results) {
                    db.transaction(function (transaction) {
                        transaction.executeSql(("DELETE FROM commands_command_products WHERE command_id  = ?;"), [command.id],
                            function (transaction, results) {
                            }, errCallback);
                    });
                    saveCommandProduct(command, command.id, callback);
                }, errCallback);
        });
    }
}

// load command by Id
var loadCommandById = function (commandId, successCallback) {
    db.transaction(function (transaction) {
        transaction.executeSql(("SELECT commands.id as id, users.users_id as userId, users.firstName as userFirstName, users.lastName as userLastName, markets.name as marketName, markets.markets_id as marketId FROM commands INNER JOIN markets ON markets.markets_id == commands.market_id INNER JOIN users ON users.users_id == commands.deliver_id WHERE commands.id=?"), [commandId],
            function (transaction, commandResult) {
                db.transaction(function (trx) {
                    trx.executeSql(("select distinct products.*, command_products.quantity, command_products.id as commandProductId from commands_command_products INNER JOIN command_products ON commands_command_products.command_product_id == command_products.id INNER JOIN products ON products.products_id == command_products.product_id where commands_command_products.command_id == ?"), [commandId],
                        function (tr, commandProductsDetails) {
                            let commandDetails = commandResult.rows[0],
                                commandProduct = commandProductsDetails.rows[0];
                            if (commandDetails) {
                                let command = {
                                    id: commandDetails.id,
                                    deliver: {
                                        id: commandDetails.userId,
                                        firstName: commandDetails.userFirstName,
                                        lastName: commandDetails.userLastName
                                    },
                                    market: {
                                        id: commandDetails.marketId,
                                        name: commandDetails.marketName
                                    },
                                    commandProducts: [{
                                        id: commandProduct.commandProductId,
                                        quantity: commandProduct.quantity,
                                        product: {
                                            id: commandProduct.products_id,
                                            name: commandProduct.name,
                                            price: commandProduct.price,
                                            group: {
                                                id: commandProduct.group_id
                                            }
                                        }
                                    }]
                                };
                                command.totalPrice = command.commandProducts[0].quantity * command.commandProducts[0].product.price;
                                console.log(successCallback, command);
                                successCallback('', 'success', command);
                            }
                        }, errCallback);
                });
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
                                location.reload();
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
        $.ajax({
            url: 'syncronize-commands',
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(commands),
            success: function (res, textStatus) {
                console.log(res, textStatus);
                syncronizeDeletedCommands();
                // sincronizeTables();
            },
            error: function (res, textStatus) {
                console.log(res, textStatus);
                syncronizeDeletedCommands();
                // sincronizeTables();
            }
        });
    }
    // sincronizeTables();
}

function updateOnlineStatus() {
    var isNavigatorOnline = navigator.onLine;
    if (isNavigatorOnline) {
        console.log('Synchronization process has been started...');
        db.transaction(function (trx) {
            trx.executeSql('SELECT commands.deliver_id, commands.market_id, commands.deleted, command_products.quantity, command_products.product_id FROM commands ' +
                'INNER JOIN commands_command_products ON commands.id == commands_command_products.command_id ' +
                'INNER JOIN command_products ON commands_command_products.command_product_id == command_products.id WHERE commands.deleted = "FALSE";',
                [], startSynchronizationProcess, errCallback)
        });
    } else {
        console.log('Browser is offline, app are using browser storage...');
    }
}

function sincronizeTables() {
    $.ajax({
        url: '/users/getDataForSyncronize',
        type: 'GET',
        contentType: 'application/json;charset=utf-8',
        success: function (res, textStatus) {
            console.log(res, textStatus);
            res.countries.forEach(country => {
                db.transaction(function (transaction) {
                    transaction.executeSql(("INSERT INTO countries (countries_id, name) VALUES (?, ?);"),
                        [country.id, country.name], function (transaction, results) {
                            console.log('Country has been inserted');
                        }, errCallback);
                });
            });
            res.cities.forEach(city => {
                db.transaction(function (transaction) {
                    transaction.executeSql(("INSERT INTO cities (cities_id, name, country_id) VALUES (?, ?, ?);"),
                        [city.id, city.name, city.country.id], function (transaction, results) {
                            console.log('City has been inserted');
                        }, errCallback);
                });
            });
            res.streets.forEach(street => {
                db.transaction(function (transaction) {
                    transaction.executeSql(("INSERT INTO streets (streets_id, name, city_id) VALUES (?, ?, ?);"),
                        [street.id, street.name, street.city.id], function (transaction, results) {
                            console.log('Street has been inserted');
                        }, errCallback);
                });
            });
            res.persons.forEach(user => {
                db.transaction(function (transaction) {
                    transaction.executeSql(("INSERT INTO users (users_id, firstName, lastName, street_id) VALUES (?, ?, ?, ?);"),
                        [user.id, user.firstName, user.lastName, user.street.id], function (transaction, results) {
                            console.log('Command has been inserted');
                        }, errCallback);
                });
            });
            res.groups.forEach(group => {
                db.transaction(function (transaction) {
                    transaction.executeSql(("INSERT INTO groups (groups_id, name) VALUES (?, ?);"),
                        [group.id, group.name], function (transaction, results) {
                            console.log('Group has been inserted');
                        }, errCallback);
                });
            });
            res.markets.forEach(market => {
                db.transaction(function (transaction) {
                    transaction.executeSql(("INSERT INTO markets (markets_id, name, owner_id, street_id) VALUES (?, ?, ?, ?);"),
                        [market.id, market.name, market.owner.id, market.street.id], function (transaction, results) {
                            console.log('Market has been inserted');
                        }, errCallback);
                });
            });
            res.products.forEach(product => {
                db.transaction(function (transaction) {
                    transaction.executeSql(("INSERT INTO products (products_id, name, price, total_quantity, group_id) VALUES (?, ?, ?, ?, ?);"),
                        [product.id, product.name, product.price, product.total_quantity, product.group.id], function (transaction, results) {
                            console.log('Product has been inserted');
                        }, errCallback);
                });
            });
        },
        error: function (res, textStatus) {
            console.log(res, textStatus);
        }
    });
}