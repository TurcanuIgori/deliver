function toogleModalToCreateProduct() {
    resetProductForm();
}

function toogleModalToUpdateProduct(productId) {
    resetProductForm();
    findProductById(productId, updateProductForm);
}

function updateProductForm(product) {
    $('#productId').val(product.id);
    $('#name').val(product.name);
    $('#price').val(product.price);
    $('#totalQuantity').val(product.totalQuantity);
    $('#' + product.group.name).attr('selected', 'selected');
}

function toogleModalToDeleteProduct(productId) {
    deleteProductById(productId, deleteProductCallbak)
}

function deleteProductCallbak(res, resStatus) {
    if (resStatus == 'success') {
        location.reload();
    }
}

// handle the submit product form
$(document).ready(function () {
    $("#btnSubmit").click(function (event) {
        // stop submit the form, we will post it manually.
        event.preventDefault();
        saveProductHandler();
    });
});

function saveProductHandler() {
    if (validateProductForm()) {
        var product = {
            id: $('#productId').val(),
            name: $('#name').val(),
            price: $('#price').val(),
            totalQuantity: $('#totalQuantity').val(),
            group: {
                id: $('#groupId').val()
            }
        };
        if (product.id) {
            updateProduct(product, productSavedAction)
        } else {
            createProduct(product, productSavedAction);
        }
    }
}

function productSavedAction(res, textStatus) {
    if (textStatus == 'success') {
        $('#exampleModal').modal('toggle');
        location.reload();
    }
}

function resetProductForm() {
    $('#productId').val('');
    $('#name').val('');
    $('#price').val('');
    $('#totalQuantity').val('');
    $('#groupId option').each(function (opt, val) {
       console.log(opt, val);
        $(this).removeAttr('selected');
    });
    $('#group_none').attr('selected', 'selected');

}

function validateProductForm() {
    var nameValue = $('#name').val();
    if (!nameValue) {
        $('#nameHelper').text('Name is must.');
        console.log('Last Name is must.');
        return false;
    } else {
        $('#nameHelper').text('');
    }
    if (nameValue.length > 20 || nameValue.length < 3) {
        $('#nameHelper').text('Length must be between 3 and 20 characters.');
        console.log('Length must be between 3 and 20 characters.');
        return false;
    } else {
        $('#nameHelper').text('');
    }

    var priceRegex = new RegExp('^[0-9]{1,4}[\\.]{0,1}[0-9]{0,2}$');
    var priceValue = $('#price').val();
    if (!priceValue) {
        $('#priceHelper').text('Price is must.');
        return false;
    } else {
        $('#priceHelper').text('');
    }
    if (!priceRegex.test(priceValue)) {
        $('#priceHelper').text('Price pattern is: \"0000.00\" or \"0000\".');
        return false;
    } else {
        $('#priceHelper').text('');
    }

    var totalQuantityRegex = new RegExp('^[0-9]{1,4}$');
    var totalQuantityValue = $('#totalQuantity').val();
    if (!totalQuantityValue) {
        $('#totalQuantityHelper').text('Total quantity is must.');
        return false;
    } else {
        $('#totalQuantityHelper').text('');
    }
    if (!totalQuantityRegex.test(totalQuantityValue)) {
        $('#totalQuantityHelper').text('Total quantity pattern is \"0000\".');
        return false;
    } else {
        $('#totalQuantityHelper').text('');
    }

    var groupIdValue = $('#groupId').val();
    if (groupIdValue == 0) {
        $('#groupIdHelper').text('Group is must.');
        return false;
    } else {
        $('#groupIdHelper').text('');
    }

    return true;
}