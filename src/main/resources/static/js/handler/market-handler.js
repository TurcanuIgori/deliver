function toogleModalToCreateMarket() {
    resetMarketForm();
}

var currentAddress;

function toogleModalToUpdateMarket(marketId) {
    // resetMarketForm();
    findMarketById(marketId, updateMarketForm);
}

function updateMarketForm(market) {
    $('#marketId').val(market.id);
    $('#name').val(market.name);
    $('#ownerId option').each(function (opt, val) {
        $(this).remove();
    });
    $('#ownerId')
        .append($('<option>')
            .attr('value', 0)
            .attr('id', 'none_owner')
            .text('(none)'));
    findAllUsers(function (res) {
        $.each(res, function (idx, owner) {
            $('#ownerId')
                .append($('<option>')
                    .attr("value", owner.id)
                    .attr("id", 'usrn_' + owner.id)
                    .text(owner.firstName + ' ' + owner.lastName));
        });
        $('#usrn_' + market.owner.id).attr('selected', 'selected');
    });

    updateAddress(market.street);
}

function toogleModalToDeleteMarket(marketId) {
    deleteMarketById(marketId, deleteMarketCallbak)
}

function deleteMarketCallbak(res, resStatus) {
    if (resStatus == 'success') {
        location.reload();
    }
}

// handle the submit market form
$(document).ready(function () {
    $("#btnSubmit").click(function (event) {
        // stop submit the form, we will post it manually.
        event.preventDefault();
        saveMarketHandler();
    });
});

function saveMarketHandler() {
    if (validateMarketForm()) {
        var market = {
            id: $('#marketId').val(),
            name: $('#name').val(),
            owner: {
                id: $('#ownerId').val()
            },
            street: {
                id: $('#streetId').val()
            }
        };
        if (market.id) {
            updateMarket(market, marketSavedAction)
        } else {
            createMarket(market, marketSavedAction);
        }
    }
}

function marketSavedAction(res, textStatus) {
    if (textStatus == 'success') {
        $('#exampleModal').modal('toggle');
        location.reload();
    }
}

function resetMarketForm() {
    $('#marketId').val('');
    $('#name').val('');
    $('#ownerId option').each(function (opt, val) {
        $(this).removeAttr('selected');
    });
    // $('#owner_none').attr('selected', 'selected');

    resetAddressDropdowns();
}

function validateMarketForm() {
    var nameValue = $('#name').val();
    if (!nameValue) {
        $('#nameHelper').text('Name is must.');
        return false;
    } else {
        $('#nameHelper').text('');
    }
    if (nameValue.length > 20 || nameValue < 3) {
        $('#nameHelper').text('Length must be between 3 and 20 characters.');
        return false;
    } else {
        $('#nameHelper').text('');
    }

    var ownerIdValue = $('#ownerId').val();
    if (ownerIdValue == 0) {
        $('#ownerIdHelper').text('Owner is must.');
        return false;
    } else {
        $('#ownerIdHelper').text('');
    }

    var streetIdValue = $('#streetId').val();
    if (streetIdValue == 0) {
        $('#streetIdHelper').text('Street is must.');
        return false;
    } else {
        $('#streetIdHelper').text('');
    }

    return true;
}
