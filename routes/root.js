let express=require('express')
let app=express.Router()
const connection_MySQL=require('../MySql/connect')
const path=require('path')
//=> 

app.get('^/$|index(.html)?',(req,res)=>{
 
    res.sendFile(path.join(__dirname,'..','views','root.html'))

})



module.exports=app
