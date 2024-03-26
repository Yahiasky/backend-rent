const connection_MySQL=require('../../MySql/connect')
var {log} =require('../../functions/log')

const deleteOne=async(req,res)=>{

    log(req)

   await connection_MySQL.query(`delete  from apprating where idUser='${req.params.idUser}'`)
   
   return  res.sendStatus(200)
}

const deleteAll=async(req,res)=>{

    log(req)

    await connection_MySQL.query(`delete  from apprating `)
   
   return  res.sendStatus(200)
}



module.exports={deleteAll,deleteOne}