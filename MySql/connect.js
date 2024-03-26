
const mysql=require('mysql2');
const { DATABASE_HOST, USER, PASSWORD, DATABASE_NAME } = require('../data/info');
require('dotenv').config()

let msg;
try{
 var connection=mysql.createPool({
    host:DATABASE_HOST,
    user:USER,
    password:PASSWORD,
    database:DATABASE_NAME
}).promise()
msg=  'connected'

}
catch(errr){
    msg='connection failed'
    connection.query(`INSERT INTO error ( typeErr, contentErr) VALUES ( '500','${errr}' );`)
}
finally{
    console.log(` My Sql :${msg}`)  
}


module.exports=connection