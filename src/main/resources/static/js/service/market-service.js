// GET - /markets/ - get all markets
function findAllMarkets(callback) {
    $.ajax({
        url: "markets/",
        async: true,
        success: function (res, textStatus) {
            callback(res);
        },
        error: function (err) {
            console.error('Hudson, we have a problem....server respose status is: '+ err.status);
        }
    });
}
// GET - /markets/marketId - find market by id
function findMarketById(id, callback) {
    $.ajax({
        url: "markets/" + id,
        async: true,
        success: function (res, textStatus) {
            callback(res);
        },
        error: function (res, textStatus) {
            findAllMarkets(function (markets) {
                for (i = 0; i < markets.length; y++) {
                    var market = markets[i];
                    if (market.id == id) {
                        callback(res);
                    }
                }
            });
        }
    });
}

// DELETE - /markets/marketId- delete market by id
function deleteMarketById(id, callback) {
    $.ajax({
        url: "markets/" + id,
        method: 'DELETE',
        success: function (res, textStatus) {
            callback(res, textStatus);
        },
        error: function (res, textStatus) {
            callback(res);
        }
    });
}

// PUT - /markets/ - update market
function updateMarket(data, callback) {
    $.ajax({
        url: 'markets/',
        type : 'PUT',
        data: JSON.stringify(data),
        contentType: "application/json;charset=utf-8",
        success: function (res, textStatus) {
            callback(res, textStatus);
        },
        error: function (res, textStatus) {
            callback(res, textStatus);
        }
    });
}

// POST - /markets/ - create market
function createMarket(data, callback) {
    $.ajax({
        url: 'markets/',
        type : 'POST',
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(data),
        success: function (res, textStatus) {
            callback(res, textStatus);
        },
        error: function (res, textStatus) {
            callback(res, textStatus);
        }
    });
}
