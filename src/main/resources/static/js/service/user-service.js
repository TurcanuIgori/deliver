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
    var user;
    createRequest();
    if(request==null){
        alert("Error creating request!");
    }
    var url = "users/" + id;
    request.open("GET", url, true);
    request.onreadystatechange=function() {
        if (request.readyState == 4){
            if(request.status == 200){
                 user = eval('(' + request.responseText + ')');
            }
        } else {
            console.log('Error to get user by id: ' + id);
        }
    };
    request.send(null);
    return user;
}
// findUserById(userId) GET
// deleteUserById(userId) DELETE
// updateUser(user) PUT
// craeteUser(newUser) POST
