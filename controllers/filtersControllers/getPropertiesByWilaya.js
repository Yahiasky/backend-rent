const connection_MySQL=require('../../MySql/connect')


var getPropsByWilaya=async(req,res)=>{
    const data=await connection_MySQL.query(`SELECT * FROM apartment where wilaya =${req.params.wilaya} ;`)
    var [FinalData]=data
   return FinalData==null ? res.sendStatus(204) :res.json(FinalData)
  


}
module.exports={getPropsByWilaya}