const connection_MySQL=require('../../MySql/connect')
var {log} =require('../../functions/log')

var blockClient=async (request,response)=>{
   log(request)
    const [[data]]=await connection_MySQL.query(`select * from blockeduser where idUser = "${request.params.idUser}"`)

    if(data) return response.sendStatus(204)
    
    connection_MySQL.query(`INSERT INTO blockeduser (idUser) VALUES ("${request.params.idUser}");`)
    
    connection_MySQL.query(`delete   FROM  apartment  WHERE idUser ='${request.params.idUser}' `)
    connection_MySQL.query(`delete   FROM  rate  WHERE idUser ='${request.params.idUser}' `)
    connection_MySQL.query(`  INSERT INTO clienthistory (idUser, event) VALUES ('${request.params.idUser}','blocked ' ); `)
  
    return response.sendStatus(200)

}
module.exports={blockClient}