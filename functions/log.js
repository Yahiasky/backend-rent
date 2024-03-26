const connection_MySQL=require('../MySql/connect')
var log=(req)=>
connection_MySQL.query(`INSERT INTO access (Url, Method) VALUES ( '${"url="+req.url+'idUser='+req.idUser}','${req.method}' );`)
module.exports={log}