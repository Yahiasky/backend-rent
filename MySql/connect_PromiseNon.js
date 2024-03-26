
const mysql=require('mysql')
require('dotenv').config()

const connection=mysql.createConnection({
  
    host:process.env.DATABASE_HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE_NAME
})
connection.connect(
    err=>{
        let msg= !err ? 'connected' : 'connection failed'
        console.log(` My Sql :${msg}`)
    }
    
    )
module.exports=connection