function toogleModalToCreateCommand() {
    resetCommandForm();
}

function toogleModalToUpdateCommand(commandId) {
    resetCommandForm();
    findCommandById(commandId, updateCommandForm);
}

function updateCommandForm(command) {
    $('#commandId').val(command.id);
    $('#deliverId option').each(function (opt, val) {
        $(this).remove();
    });
    $('#deliverId')
        .append($("<option></option>")
            .attr('value', 0)
            .attr('id', 'none_deliver')
            .text('(none)'));
    // create options from  taken delivers
    findAllUsers(function(res) {
        $.each(res, function(idx, user) {
            $('#deliverId')
                .append($('<option>')
                    .attr("value", user.id)
                    .attr("id", 'deliver_' + user.id)
                    .text(user.firstName + ' ' + user.lastName));
        });
        $('#deliver_' + command.deliver.id).attr('selected', 'selected');
    });


    $('#market_' + command.market.id).attr('selected', 'selected');
}

function toogleModalToDeleteCommand(commandId) {
    deleteCommandById(commandId, deleteCommandCallbak)
}

function deleteCommandCallbak(res, resStatus) {
    if (resStatus == 'success') {
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
            id: $('#productId').val(),
            deliver: {
                id: $('#deliverId').val()
            },
            market: {
                id: $('#marketId').val()
            }
        };
        if (command.id) {
            updateCommand(command, commandSavedAction)
        } else {
            createCommand(command, commandSavedAction);
        }
    }
}

function commandSavedAction(res, textStatus) {
    if (textStatus == 'success') {
        $('#exampleModal').modal('toggle');
        location.reload();
    }
}

function resetCommandForm() {
    $('#commandId').val('');
    $('#deliverId option').each(function (opt, val) {
        $(this).removeAttr('selected');
    });
    $('#marketId option').each(function (opt, val) {
        $(this).removeAttr('selected');
    });
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

    return true;
}