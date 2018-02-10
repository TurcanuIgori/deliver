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
            findAllCities(function (cities) {
                var citiesByCountryId = [];
                for (i = 0; i < cities.length; i++) {
                    var city = cities[i];
                    if (city.country.id == countryId) {
                        citiesByCountryId.add(city);
                    }
                }
                callback(citiesByCountryId);
            });
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
            findAllStreets(function(streets) {
                var streetsByCityId = [];
                for (i = 0; i < streets.length) {
                    var street = streets[i];
                    if (street.city.id == cityId) {
                        streetsByCityId.add(street);
                    }
                }
                callback(streetsByCityId);
            });
        }
    });
}