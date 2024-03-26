const connection_MySQL=require('../../MySql/connect')
var {log} =require('../../functions/log')

var unblockClient=async (request,response)=>{
    log(request)
    const [[data]]=await connection_MySQL.query(`select * from blockeduser where idUser = "${request.params.idUser}"`)

    if(!data) return response.sendStatus(204)
    
    connection_MySQL.query(`delete from blockeduser  where idUser= "${request.params.idUser}";`)
    connection_MySQL.query(`  INSERT INTO clienthistory (idUser, event) VALUES ('${request.params.idUser}','unblocked ' ); `)
    return response.sendStatus(200)

}
module.exports={unblockClient}