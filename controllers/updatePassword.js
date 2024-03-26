const connection_MySQL=require('../MySql/connect')
const bcrupt=require('bcrypt')
let {format}=require('date-fns')
var updatePassword=async(req,res)=>{
          var oldPass=req.body.oldPass
          var username=req.username
          var newPass=req.body.newPass
          var [data]=await connection_MySQL.query('select password from users where username=?',[username])
          var password=data[0].password
          const match=await bcrupt.compare(oldPass,password)
          if(!match) return res.sendStatus(403)
          var pass=await bcrupt.hash(newPass,10)
          await connection_MySQL.query('update users set password = ? where username= ?',[pass,username])
          await connection_MySQL.query(`UPDATE users SET lastMod = ? WHERE users.username =? ;`,[format(new Date(),'yyyy-MM-dd  HH:mm:ss'),username])
          return res.sendStatus(200)




}
module.exports=updatePassword