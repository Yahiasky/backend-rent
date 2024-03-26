const connection_MySQL=require('../../MySql/connect')
var {log} =require('../../functions/log')







var getClientByJoinedDate=async(req,res)=>{

    log(req)
    const [[Code]]=await connection_MySQL.query(`SELECT roleNumber FROM role where roleName='client';`)
   const data=await connection_MySQL.query(`SELECT * FROM user where joinedDate = '${req.params.joinedDate}' and roleNumber=${Code.roleNumber};`)
   var [FinalData]=data
   FinalData==null ? res.sendStatus(204) :res.json(FinalData)
   

}
var getBlockedClientByJoinedDate=async(req,res)=>{

    log(req)

   const data=await connection_MySQL.query(`SELECT * FROM user as u,blockeduser as bu where joinedDate = '${req.params.joinedDate}' and u.idUser=bu.idUser `)
   var [FinalData]=data
   FinalData==null ? res.sendStatus(204) :res.json(FinalData)
   

}
module.exports={getClientByJoinedDate,getBlockedClientByJoinedDate}