const connection_MySQL=require('../../MySql/connect')
var {log} =require('../../functions/log')



var getClientStatus=async (req,res)=>{
    log(req)
   
  const [[data]]=await connection_MySQL.query(`select * from blockeduser where idUser = "${req.params.idUser}"`)

  var status=data ?'blocked-client': 'unblocked-client'
  res.json(status)






}


module.exports={getClientStatus}