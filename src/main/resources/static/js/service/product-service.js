// GET - /products/ - get all products
function findAllProducts(callback) {
    $.ajax({
        url: "products/",
        async: true,
        success: function (res, textStatus) {
            callback(res);
        },
        error: function (err) {
            console.error('Hudson, we have a problem....server respose status is: '+ err.status);
        }
    });
}
// GET - /products/ - find product by id
function findProductById(id, callback) {
    $.ajax({
        url: "products/" + id,
        async: true,
        success: function (res, textStatus) {
            callback(res);
        },
        error: function (res, textStatus) {
            findAllProducts(function (products) {
                for (i = 0; i < products.length; i++) {
                    var product = products[i];
                    if (product.id == id) {
                        callback(product);
                    }
                }
            });
        }
    });
}

// DELETE - /products/- delete product by id
function deleteProductById(id, callback) {
    $.ajax({
        url: "products/" + id,
        method: 'DELETE',
        success: function (res, textStatus) {
            callback(res, textStatus);
        },
        error: function (res, textStatus) {
            callback(res);
        }
    });
}

// PUT - /products/ - update product
function updateProduct(data, callback) {
    $.ajax({
        url: 'products/',
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

// POST - /products/ - create product
function createProduct(data, callback) {
    $.ajax({
        url: 'products/',
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
