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

    currentAddress = market.street;
    $('#countryId option').each(function (idx, val) {
        $(this).remove();
    });
    $('#countryId')
        .append($("<option>")
            .attr('value', 0)
            .attr('id', 'none_country')
            .text('(none)'));
    findAllCountries(function (res) {
        $.each(res, function (idx, country) {
            $('#countryId')
                .append($('<option>')
                    .attr('value', country.id)
                    .attr("id", 'contr_' + country.id)
                    .text(country.name));
        });
        $('#contr_' + market.street.city.country.id).attr('selected', 'selected');
    });

    $('#cityId option').each(function (idx, val) {
        $(this).remove();
    });
    $('#cityId')
        .append($("<option>")
            .attr('value', 0)
            .attr('id', 'none_city')
            .text('(none)'));
    $('#cityId').removeAttr('disabled');
    getCitiesByCountry(market.street.city.country.id, function (res) {
        $.each(res, function (idx, city) {
            $('#cityId')
                .append($('<option>')
                    .attr('value', city.id)
                    .attr("id", 'city_' + city.id)
                    .text(city.name));
        });
        $('#city_' + market.street.city.id).attr('selected', 'selected');
    });

    $('#streetId option').each(function (idx, val) {
        $(this).remove();
    });
    $('#streetId')
        .append($("<option>")
            .attr('value', 0)
            .attr('id', 'none_street')
            .text('(none)'));
    getStreetsByCity(market.street.city.id, function (res) {
        $.each(res, function (idx, street) {
            $('#streetId')
                .append($('<option>')
                    .attr('value', street.id)
                    .attr("id", 'street_' + street.id)
                    .text(street.name));
        });
        $('#streetId').removeAttr('disabled');
        $('#street_' + market.street.id).attr('selected', 'selected');
    });
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
