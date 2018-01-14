$(document).ready(function () {
    $('#countryId').on('change', function () {
        getCitiesByCountry($("#countryId").val(), updateCities);
        console.log('URAAA');
    });
});

function updateCities(res, resStatus) {
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
        // console.log
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
            .text('(none)'));
    // create options from  taken streets
    $.each(res, function (index, value) {
        $('#streetId')
            .append($('<option>')
                .attr("value", value.id)
                .attr("id", value.name)
                .text(value.name));
    });
}

function toogleModalToCreateMarket() {}