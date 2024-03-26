let express=require('express')
let app=express.Router()
const connection_MySQL=require('../MySql/connect')
const path=require('path')
//=> 

app.get('^/$|index(.html)?',(req,res)=>{
    console.log(`\n ${req.url} \n`)
    connection_MySQL.query(`INSERT INTO access (  URL, METHOD) VALUES ( '${req.url}','${req.method}' );`)
    res.sendFile(path.join(__dirname,'..','views','root.html'))

})



module.exports=app