const connection_MySQL=require('../../MySql/connect')
var {log} =require('../../functions/log')


var getUnBlockedClients=async (req,res)=>{
    log(req)
    const [[Code]]=await connection_MySQL.query(`SELECT roleNumber FROM role where roleName='client';`)
    const [data]=await connection_MySQL.query(`SELECT * FROM user where roleNumber=${Code.roleNumber} and user.idUser not in (select idUser from blockeduser) ;`)
   
   return res.json(data)

}


module.exports={getUnBlockedClients}