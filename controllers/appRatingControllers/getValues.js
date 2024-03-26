const connection_MySQL=require('../../MySql/connect')
var {log} =require('../../functions/log')

const getAllValues=async(req,res)=>{

    log(req)

    const [allValues]=await connection_MySQL.query(`select * from apprating a , user u  where a.idUser=u.idUser ;`)
   
    res.json(allValues)
}

const getHighValues=async(req,res)=>{

    log(req)

    const [Values]=await connection_MySQL.query(`select * from apprating a , user u  where a.idUser=u.idUser  and rateValue <= 5 and rateValue >=4`)
   
    res.json(Values)
}

const getLowValues=async(req,res)=>{

    log(req)

    const [Values]=await connection_MySQL.query(`select * from apprating a , user u  where a.idUser=u.idUser and rateValue < 4 and rateValue >=1`)
   
    res.json(Values)
}


module.exports={getAllValues,getHighValues,getLowValues}