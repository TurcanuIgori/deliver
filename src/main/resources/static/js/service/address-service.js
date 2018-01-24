function findAllCountries(callback) {
    $.ajax({
        url: "countries/",
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

function findAllCities(callback) {
    $.ajax({
        url: "cities/",
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

function findAllStreets(callback) {
    $.ajax({
        url: "streets/",
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