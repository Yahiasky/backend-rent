const connection_MySQL=require('../../MySql/connect')
var {log} =require('../../functions/log')






var getClientHistory=async(req,res)=>{

    log(req)


   

   const[ data]=await connection_MySQL.query(`SELECT  event,eventDate FROM clienthistory where idUser ='${req.params.idUser}'  ;`)
 


  
   res.json(data)
   

}





module.exports={getClientHistory}