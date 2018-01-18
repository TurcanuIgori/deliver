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
            // .attr('selected', 'selected')
            .text('(none)'));

    $('#countryId option').each(function (opt, val) {
        $(this).removeAttr('selected');
    });
    // $('#countryId').attr('selected', 'selected');
}
