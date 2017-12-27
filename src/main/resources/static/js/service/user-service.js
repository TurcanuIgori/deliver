var request = null;
function createRequest(){
    try{
        request=new XMLHttpRequest();
    }catch(trymicrosoft){
        try{
            request=new ActiveXObject("Msxml2.XMLHTTP");
        } catch(othermicrosoft){
            try{
                request=new ActiveXObject("Microsoft.XMLHTTP");
            }catch(failed){
                request=null;
            }
        }
    }
}

// findAllUsers() GET

function findUserById(id){
    // var user;
    // createRequest();
    // if(request==null){
    //     alert("Error creating request!");
    // }
    // var url = "users/" + id;
    // request.open("GET", url, true);
    // request.onreadystatechange=showResult();
    // request.send(null);
    // return user;
    $.get("users/" + id, function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });
}

function showResult() {
    console.log(request);
    if (request.readyState == 4){
        if(request.status == 200){
            user = eval('(' + request.responseText + ')');
        }
    } else {
        console.error('Hudson, we have a problem....server respose status is: ' + request.status);
    }
}
// findUserById(userId) GET
// deleteUserById(userId) DELETE
// updateUser(user) PUT
// craeteUser(newUser) POST
