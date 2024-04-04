

// let express=require('express')
// let app=express.Router()
// const connection_MySQL=require('../../MySql/connect')
// const { blockClient} = require('../../controllers/clientsControllers/blockClient')


// const connection_MySQL=require('../../MySql/connect')
// var {log} =require('../../functions/log')


// //*404
// app.all('*',(req,res)=>{
//     connection_MySQL.query(`INSERT INTO access (  URL, METHOD) VALUES ( '${req.url}','${req.method}' );`)
//     res.status(404)
//        .sendFile(path.join(__dirname,'..','..','views','404.html'))
//        connection_MySQL.query(`INSERT INTO error ( idErrType, errContent) VALUES ( '404','NOT FOUND ERROR AT users' );`)
// })
// module.exports=app
// // roleNumber=${Code.roleNumber}

// const [[Code]]=await connection_MySQL.query(`SELECT roleNumber FROM role where roleName='client';`)