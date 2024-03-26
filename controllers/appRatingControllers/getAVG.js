const connection_MySQL=require('../../MySql/connect')
var {log} =require('../../functions/log')

const getAVG=async(req,res)=>{

    log(req)

    const [AVG]=await connection_MySQL.query(`select AVG(rateValue) from apprating`)
   
    res.json(AVG[0])
}
module.exports={getAVG}