$(document).ready(function () {
    $('#countryId').on('change', function () {
        getCitiesByCountry($("#countryId").val(), updateCities);
    });
});

function updateCities(res, resStatus) {
    $('#streetId').attr('disabled', 'disabled');
    // delete all options
    $('#streetId option').each(function (opt, val) {
        $(this).remove();
    });
    $('#cityId').removeAttr('disabled');
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
}

$(document).ready(function () {
    $("#cityId").on('change', function () {
        getStreetsByCity($("#cityId").val(), updateStreets);
    });
});

function updateStreets(res, resStatus) {
    $('#streetId').removeAttr('disabled');
    // delete all options
    $('#streetId option').each(function (opt, val) {
        $(this).remove();
    });
    $('#streetId')
        .append($('<option></option>')
            .attr('value', 0)
            .attr('id', 'none_street')
            .attr('selected', 'selected')
            .text('(none)'));
    // create options from  taken streets
    $.each(res, function (index, value) {
        $('#streetId')
            .append($('<option>')
                .attr("value", value.id)
                .attr("id", 'str_' + value.id)
                .text(value.name));
    });
}

function resetAddressDropdowns() {
    // reset street dropdown
    $('#streetId').attr('disabled', 'disabled');
    // delete all options
    $('#streetId option').each(function (opt, val) {
        $(this).remove();
    });
    $('#streetId')
        .append($('<option></option>')
            .attr('value', 0)
            .attr('id', 'none_street')
            // .attr('selected', 'selected')
            .text('(none)'));

    // reset city dropdown
    $('#cityId').attr('disabled', 'disabled');
    // delete all options
    $('#cityId option').each(function (opt, val) {
        $(this).remove();
    });
    $('#cityId')
        .append($('<option></option>')
            .attr('value', 0)
            .attr('id', 'none_city')
            .text('(none)'));

    $('#countryId option').each(function (opt, val) {
        $(this).removeAttr('selected');
    });
}

function updateAddress(address) {
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
        if (address) {
            $('#contr_' + address.city.country.id).attr('selected', 'selected');
        }
    });
    if (address) {
        $('#cityId option').each(function (idx, val) {
            $(this).remove();
        });
        $('#cityId')
            .append($("<option>")
                .attr('value', 0)
                .attr('id', 'none_city')
                .text('(none)'));
        getCitiesByCountry(address.city.country.id, function (res) {
            $.each(res, function (idx, city) {
                $('#cityId')
                    .append($('<option>')
                        .attr('value', city.id)
                        .attr("id", 'city_' + city.id)
                        .text(city.name));
            });
            if (address) {
                $('#city_' + address.city.id).attr('selected', 'selected');
            }
        });

        $('#streetId option').each(function (idx, val) {
            $('#cityId').removeAttr('disabled');
            $(this).remove();
        });
        $('#streetId')
            .append($("<option>")
                .attr('value', 0)
                .attr('id', 'none_street')
                .text('(none)'));
        getStreetsByCity(address.city.id, function (res) {
            $.each(res, function (idx, street) {
                $('#streetId')
                    .append($('<option>')
                        .attr('value', street.id)
                        .attr("id", 'street_' + street.id)
                        .text(street.name));
            });
            $('#streetId').removeAttr('disabled');
            $('#street_' + address.id).attr('selected', 'selected');

        });
    } else {
        $('#cityId').attr('disabled', 'disabled');
        $('#streetId').attr('disabled', 'disabled');

    }
}
