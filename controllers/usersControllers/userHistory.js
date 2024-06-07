const connection=require('../../Database/connect')
var {log} =require('../../functions/log')






var getClientHistory=async(req,res)=>{

    log(req)


   

   const[ data]=await connection.query(`SELECT  event,eventDate FROM clienthistory where idUser ='${req.params.idUser}'  ;`)
 


  
   res.json(data)
   

}





module.exports={getClientHistory}