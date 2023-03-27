const connection = require ("../database")

function getBooks(request, response){

    let params = [request.query.id_user, request.query.id_book]
    let sql;
    let respuesta;
    console.log(request.query);
    if(request.query.id_user != undefined && request.query.id_book == undefined){
//Aquí decimos que si id_user esta al contrario de undefined, es decir, si hay un valor, 
//que entonces siga a este sql.
 
     sql = "SELECT * FROM book WHERE id_user= " + "?";
    }
    else if(request.query.id_book != undefined){
      
     sql = "SELECT * FROM book WHERE id_user= " + "? AND id_book = ?" ;
    }
    
 
    connection.query(sql,params, function(err, result){
 
     if(err){
         console.log(err);
         respuesta = {error:true, codigo:200,
                     mensaje:"No ha habido coincidencias", data:[]}
     }
     else{
       
         respuesta = {error:false, codigo:200,
                      mensaje:"Si ha habido coincidencias", data:result}
     }
            response.send(respuesta)
    })

    
}

function postBooks(request, response){

  
 
    let respuesta;
    let sql = "INSERT INTO book (id_user,title, type, author, price, photo) " +
        "VALUES ('" + request.body.id_user + "','" + request.body.title + "', '" + request.body.type + "', '" +
            request.body.author + "', '" + request.body.price + "', '" + request.body.photo + "')" 

      

    connection.query(sql,function(err, result){

        if(err){
            console.log(err);
            respuesta = {error:true, codigo:200,
                mensaje:"No se ha podido hacer la conexion", data:[]}
        }
        else{
           console.log(result);
           //Convertimos el id a string, porque en Angular, dentro de respuesta, el mensaje que
           //espera es de tipo string, al hacerlo así, no dará error.
           if(result.insertId){
            respuesta = {error: false, codigo: 200, mensaje: String(result.insertId), data: []}
           }                                                                          
           else{
            respuesta = {error: true, codigo: 200, mensaje: "-1", data: []}
           }
            // En angular checkar mensaje, siepmre que no sea == -1 se inserto bien 
        }
        response.send(respuesta)
       })
       
    }

    function putBooks(request, response){
        
        let respuesta;
        let params = [request.body.title,
                    request.body.type,
                    request.body.author,
                    request.body.price,
                    request.body.photo,
                    request.body.id_book];
        let sql = "UPDATE book SET title = COALESCE(?, title), type = COALESCE(?, type)," +
                  "author = COALESCE(?, author), price = COALESCE(?, price), " +
                  "photo = COALESCE(?, photo) WHERE (id_book = ?);";

        connection.query(sql, params, function(err, result){
            if(err){
                console.log(err);
                respuesta = {error:true, codigo:200,
                            mensaje:"Ha habido un error en la conexion", data:[]}
            }
            else{
                respuesta = {error:false, codigo:200,
                             mensaje:String(result.affectedRows), data:[]}
                             // en angular si mensaje == 1 se cambio el libro, si == 0 el libro no existe
            }
                   response.send(respuesta)
           
        })

    }


    function deleteBooks(request, response){
        
       let respuesta;
       let params = [request.body.id_book];

       let sql = "DELETE FROM book WHERE id_book= " + "?";

       connection.query(sql, params, function(err, result){
        if(err){
            console.log(err);
            respuesta = {error:true, codigo:200,
                        mensaje:"Ha habido un error en la conexion", data:[null]}
        }
        else{
            respuesta = {error:false, codigo:200,
                         mensaje:String(result.affectedRows), data:[null]}
                         // en angular si mensaje == 1 se elimino el libro, si == 0 el libro no existe
        }
               response.send(respuesta)
       
    })
    }



 module.exports = {getBooks, postBooks, putBooks, deleteBooks}