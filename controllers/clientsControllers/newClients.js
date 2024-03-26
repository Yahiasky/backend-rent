const connection_MySQL=require('../../MySql/connect')
var {log} =require('../../functions/log')




var getNewClients=async(req,res)=>{
    let {format}=require('date-fns')
    log(req)
    const [[Code]]=await connection_MySQL.query(`SELECT roleNumber FROM role where roleName='client';`)
    const DateToday=format(new Date(),'yyyy-MM-dd')
    const [newClients]=await connection_MySQL.query(`select * from user where roleNumber=${Code.roleNumber} and joinedDate='${DateToday}'`)
    return res.json(newClients)


}

module.exports={getNewClients}