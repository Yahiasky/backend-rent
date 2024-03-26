const connection_MySQL=require('../../MySql/connect')
var {log} =require('../../functions/log')


var getBlockedClients=async (req,res)=>{
    log(req)
   
    const [data]=await connection_MySQL.query(`SELECT * FROM blockeduser as bc,user as c where bc.idUser=c.idUser ;`)
   
  res.json(data)

}


module.exports={getBlockedClients}