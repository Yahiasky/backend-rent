const connection_MySQL=require('../../MySql/connect')
var {log} =require('../../functions/log')





var getClients=async (req,res)=>{
    // log(req)

    
    const [data]=await connection_MySQL.query(`SELECT * FROM User ;`)
    res.json(data)

}


var getClient=async(req,res)=>{

    // log(req)
    
   const data=await connection_MySQL.query(`SELECT * FROM User where idUser = '${req.params.idUser}' ;`)
   var [FinalData]=data[0]
   FinalData==null ? res.sendStatus(204) :res.json(FinalData)
   

}


var deleteClient=async(req,res)=>{
    const [[Code]]=await connection_MySQL.query(`SELECT roleNumber FROM role where roleName='client';`)            
    log(req)
   await connection_MySQL.query(`delete   FROM  blockeduser  WHERE  idUser='${req.params.idUser}' `)
   await connection_MySQL.query(`delete   FROM  apartment  WHERE idUser ='${req.params.idUser}' `)
   await  connection_MySQL.query(`delete   FROM  rate  WHERE idUser ='${req.params.idUser}' `)
   await  connection_MySQL.query(`delete   FROM  clienthistory  WHERE idUser ='${req.params.idUser}' `)
   await  connection_MySQL.query(`delete   FROM  login  WHERE idUser ='${req.params.idUser}' `)
   await  connection_MySQL.query(`delete   FROM  rent  WHERE idUser ='${req.params.idUser}' `)
    const data = await 
    connection_MySQL.query(`delete   FROM user WHERE user.idUser ='${req.params.idUser}' and roleNumber=${Code.roleNumber}`)

    
    



     res.json({
        "message":"deleted !"
     })





    
}




module.exports={getClients,deleteClient,getClient}