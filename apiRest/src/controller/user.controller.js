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
      let respuesta;
      let params = [request.body.email, request.body.password];
      let sql = "SELECT id_user, name, last_name, email, photo FROM user WHERE email = ? AND password = ?";
    
      connection.query(sql, params, function(err, result) {
        if (err) {
          console.log(err);
        } else if (result.length === 0) {
          respuesta = {error: true, codigo:200, mensaje:'usuario no encontrado', data:null, result:result}
        } else {
          respuesta = {error: false, codigo:200, mensaje:'usuario encontrado', data:null, result:result}

        }
        response.send(respuesta);
      });
    }
    
    function putUser(request, response) {
      
      let respuesta;
      let params = [request.body.name,
                  request.body.last_name,
                  request.body.email,
                  request.body.photo,
                  request.body.id_user];
      let sql = "UPDATE user SET name = COALESCE(?, name), last_name = COALESCE(?, last_name), email = COALESCE(?, email), photo = COALESCE(?, photo) WHERE (id_user = ?);";

      connection.query(sql, params, function(err, result){
          if(err){
              console.log(err);
              respuesta = {error:true, codigo:200,
                          mensaje:"Ha habido un error en la conexion", data:null, result:result}
                          console.log(respuesta);
          }
          
          else{
              respuesta = {error:false, codigo:200,
                           mensaje:"Se han modificado los datos", data:null, result:result}
                           
                 response.send(respuesta)
         
              }
            })
    }
         
   
    

    module.exports = {postUser, loginUser, putUser}