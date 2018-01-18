function getCitiesByCountry(countryId, callback) {
    $.ajax({
        url: "cities/by-country/" + countryId,
        async: true,
        type: 'GET',
        success: function (res, textStatus) {
            callback(res, textStatus);
        },
        error: function (res, textStatus) {
            callback(res, textStatus);
        }
    });
}

function getStreetsByCity(cityId, callback) {
    $.ajax({
        url: "streets/by-city/" + cityId,
        async: true,
        type: 'GET',
        success: function (res, textStatus) {
            callback(res, textStatus);
        },
        error: function (res, textStatus) {
            callback(res, textStatus);
        }
    });
}