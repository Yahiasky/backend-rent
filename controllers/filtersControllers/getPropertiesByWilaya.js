const connection_MySQL=require('../../MySql/connect')


var getPropsByWilaya=async(req,res)=>{
    const data=await connection_MySQL.query(`SELECT * FROM apartment,"User" where wilaya =${req.params.wilaya} 
    and apartment.idUser="User".idUser ;`)
    
   return data.rows==null ? res.sendStatus(204) :res.json(data.rows)
  


}
module.exports={getPropsByWilaya}