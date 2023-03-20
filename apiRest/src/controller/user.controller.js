const connection = require ("../database")

function postUser(request, response){

    console.log(request.body);
    
    let params = [request.body.name, request.body.last_name, request.body.email,
                  request.body.photo, request.body.password]

    let sql = "INSERT INTO user (name, last_name,email,photo,password) " +
      "VALUES ( ?,?,?,?,?)"
    console.log(sql);

    connection.query(sql, params, function(err, result){

        if(err){
            console.log(err);
        }
        else{
           console.log(result);
           if(result.insertId){
            response.send(String(result.insertId));
           }
           else{
            response.send("-1");
           }
        }
    
       })
          
    }

    function loginUser(request, response) {
      
      let params = [request.body.email, request.body.password];
      let sql = "SELECT id_user, name, last_name, email, photo FROM user WHERE email = ? AND password = ?";
    
      connection.query(sql, params, function(err, result) {
        if (err) {
          console.log(err);
        } else if (result.length === 0) {
          response.send({"Mensaje": "No existe el usuario"});
        } else {
          response.send(result);
        }
      });
    }
    
         
   
    

    module.exports = {postUser, loginUser}