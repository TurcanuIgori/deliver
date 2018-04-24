function onLoad() {
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
}

function toogleModalToCreateCommand() {
    resetCommandForm();
}

function toogleModalToUpdateCommand(commandId) {
    resetCommandForm();
    findCommandById(commandId, updateCommandForm);
}

function updateCommandForm(command) {
    updateSelects(command);
}

function toogleModalToDeleteCommand(commandId) {
    deleteCommandById(commandId, deleteCommandCallbak)
}

function deleteCommandCallbak(res, resStatus) {
    if (resStatus == 'success') {
        applicationCache.addEventListener('updateready', function () {
            if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
                window.applicationCache.swapCache();
                console.log("appcache updated");
                window.location.reload();
            }
        });
        location.reload();
    }
}

// handle the submit command form
$(document).ready(function () {
    $("#btnSubmit").click(function (event) {
        // stop submit the form, we will post it manually.
        event.preventDefault();
        saveCommandHandler();
    });
});

function saveCommandHandler() {
    if (validateCommandForm()) {
        var command = {
            id: $('#commandId').val(),
            deliver: {
                id: $('#deliverId').val()
            },
            market: {
                id: $('#marketId').val()
            },
            commandProducts: [
                {
                    id: $('#cproductId_1').val(),
                    quantity: $('#qproduct_1').val(),
                    product: {
                        id: $('#productId1').val()
                    }
                }
            ]
        };
        if (command.id) {
            updateCommand(command, commandSavedAction);
        } else {
            createCommand(command, commandSavedAction);
        }
    }
}

function commandSavedAction(res, textStatus) {
    if (textStatus == 'success') {
        $('#exampleModal').modal('toggle');
        applicationCache.addEventListener('updateready', function () {
            if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
                window.applicationCache.swapCache();
                console.log("appcache updated");
                window.location.reload();
            }
        });
        location.reload();
    }
}

function resetCommandForm() {
    $('#commandId').val('');
    $('#qproduct_1').val('');
    updateSelects();
}

function validateCommandForm() {

    var deliverIdValue = $('#deliverId').val();
    if (!deliverIdValue) {
        $('#deliverIdHelper').text('Deliver is must.');
        return false;
    } else {
        $('#deliverIdHelper').text('');
    }

    var marketIdValue = $('#marketId').val();
    if (!marketIdValue) {
        $('#marketIdHelper').text('Market is must.');
        return false;
    } else {
        $('#marketIdHelper').text('');
    }
    if ($('#productId1').val()) {
        var quantityPattern = new RegExp('[0-9]{1,5}');
        var quantityValue = $('#qproduct_1').val();
        if (!quantityPattern.test(quantityValue)) {
            $('#productId0Helper').text('Value of the quantity must be a number.');
            return false;
        } else {
            $('#productId0Helper').text('');
        }
    }

    return true;
}

function addOProduct(oProductId) {
    var oProduct = $('#' + oProductId).clone();
}


function updateSelects(command) {
    $('#deliverId option').each(function (opt, val) {
        $(this).remove();
    });
    $('#deliverId')
        .append($("<option></option>")
            .attr('value', 0)
            .attr('id', 'none_deliver')
            .text('(none)'));
    // create options from  taken delivers
    findAllUsers(function (res) {
        $.each(res, function (idx, user) {
            $('#deliverId')
                .append($('<option>')
                    .attr("value", user.id)
                    .attr("id", 'deliver_' + user.id)
                    .text(user.firstName + ' ' + user.lastName));
        });
        if (command) {
            $('#commandId').val(command.id);
            $('#deliver_' + command.deliver.id).attr('selected', 'selected');
        }
    });
    $('#marketId option').each(function (opt, val) {
        $(this).remove();
    });
    $('#marketId')
        .append($("<option>")
            .attr('value', 0)
            .attr('id', 'none_market')
            .text('(none)'));
    findAllMarkets(function (res) {
        $.each(res, function (idx, market) {
            $('#marketId')
                .append($('<option>')
                    .attr('value', market.id)
                    .attr("id", 'market_' + market.id)
                    .text(market.name));
        });
        if (command) {
            $('#market_' + command.market.id).attr('selected', 'selected');
        }
    });
    $('#productId1 option').each(function (opt, val) {
        $(this).remove();
    });
    $('#productId1')
        .append($('<option>')
            .attr('value', 0)
            .attr('id', 'none_product')
            .text('(none)'));
    findAllProducts(function (res) {
        $.each(res, function (idx, product) {
            $('#productId1')
                .append($('<option>')
                    .attr('value', product.id)
                    .attr("id", 'product_' + product.id)
                    .text(product.name));
        });
        if (command) {
            if (command.commandProducts && command.commandProducts[0]) {
                $('#cproductId_1').val(command.commandProducts[0].id);
                console.log(command.commandProducts);
                $('#qproduct_1').val(command.commandProducts[0].quantity);
                $('#product_' + command.commandProducts[0].product.id).attr('selected', 'selected');
            }
        }
    });
}