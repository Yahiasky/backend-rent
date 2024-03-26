const connection_MySQL=require('../../MySql/connect')
var {log} =require('../../functions/log')







var getClientByUsername=async(req,res)=>{

    log(req)
    const [[Code]]=await connection_MySQL.query(`SELECT roleNumber FROM role where roleName='client';`)
   const data=await connection_MySQL.query(`SELECT * FROM user where username = '${req.params.username}' and roleNumber=${Code.roleNumber};`)
   var [FinalData]=data
   FinalData==null ? res.sendStatus(204) :res.json(FinalData)
   

}

var getBlockedClientByUsername=async(req,res)=>{

    log(req)

   const data=await connection_MySQL.query(`SELECT * FROM user as u,blockeduser as bu where username = '${req.params.username}' and u.idUser=bu.idUser ;`)
   var [FinalData]=data
   FinalData==null ? res.sendStatus(204) :res.json(FinalData)
   

}

module.exports={getClientByUsername,getBlockedClientByUsername}