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
        $(this).removeAttr('selected');
    });
    $('#usrn_' + market.owner.username).attr('selected', 'selected');

    currentAddress = market.street;
    $('#countryId option').each(function (opt, val) {
        $(this).removeAttr('selected');
    });
    $('#' + market.street.city.country.name).attr('selected', 'selected');
    getCitiesByCountry($('#countryId').val(), updateCitiesOnPopulate);
}

function updateCitiesOnPopulate(res, resStatus) {
    $('#streetId').attr('disabled', 'disabled');
    // delete all options
    $('#streetId option').each(function (opt, val) {
        $(this).remove();
    });
    // delete all options
    $('#cityId option').each(function (opt, val) {
        $(this).remove();
    });
    $('#cityId')
        .append($("<option></option>")
            .attr('value', 0)
            .attr('id', 'none_city')
            .text('(none)'));
    // create options from  taken cities
    $.each(res, function (index, value) {
        $('#cityId')
            .append($('<option>')
                .attr("value", value.id)
                .attr("id", value.name)
                .text(value.name));
    });
    $('#' + currentAddress.city.name).attr('selected', 'selected');
    $('#cityId').removeAttr('disabled');
    getStreetsByCity($("#cityId").val(), updateStreetsOnPopulate);
}

function updateStreetsOnPopulate(res, resStatus) {
    $('#streetId').removeAttr('disabled');
    // delete all options
    $('#streetId option').each(function (opt, val) {
        $(this).remove();
    });
    $('#streetId')
        .append($('<option></option>')
            .attr('value', 0)
            .attr('id', 'none_street')
            .text('(none)'));
    // create options from  taken streets
    $.each(res, function (index, value) {
        $('#streetId')
            .append($('<option>')
                .attr("value", value.id)
                .attr("id", 'str_' + value.id)
                .text(value.name));
    });
    $('#str_' + currentAddress.id).attr('selected', 'selected');
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
