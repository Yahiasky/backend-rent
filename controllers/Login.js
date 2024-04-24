const connection_MySQL=require('../MySql/connect')
let jwt=require('jsonwebtoken')
let bcrypt=require('bcrypt')
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require('../data/info')
let {format}=require('date-fns')
const { getOwnerRate, getClientRate } = require('../functions/getUserAVG')
const Login=async (req,res)=>{

    //username passowrd $2b$10$RCzDCzhgIaRyBUVHn8kvxOg.A5HexvMIfMsC3k2yyhDfzr0uvb8mK
   
    if(!req.body.email || !req.body.password) return res.status(400).json({"message":"username & password are required"})
      
  
  
      
     const TheUser=await connection_MySQL.query(`select * from "User" where email='${req.body.email}'`)
    
    
     if(!TheUser.rows[0]) return res.status(403).json({"message":"invalid email"})
     
      const match=await bcrypt.compare(req.body.password,TheUser.rows[0].hashedpassword)
      if(!match) return res.status(401).json({"message":"password incorrect"})
   
     
   
      let access_token=jwt.sign(
        {
            "userInfo":{
            "email": req.body.email,
            "username":TheUser.rows[0].username,
            "idUser":TheUser.rows[0].iduser,
           

            }
        },ACCESS_TOKEN_SECRET,{
            expiresIn:"30s"
        }
      )
      
      let refresh_token=jwt.sign(
        {
            "userInfo":{
            "email": req.body.email,
            "username":TheUser.rows[0].username,
            "idUser":TheUser.rows[0].iduser,
            }
        },REFRESH_TOKEN_SECRET,{
            expiresIn:"1d"
        }
      )

      connection_MySQL.query(`insert into login (refreshToken,idUser,logdate) values ('${refresh_token}','${TheUser.rows[0].iduser}','${format(new Date(),'yyyy-MM-dd  HH:mm:ss')}')`)
      res.cookie('refreshToken',refresh_token,{httpOnly:true,maxAge:24*60*60*1000,sameSite:'None',secure:true})
      return res.json({
        "access_token":access_token,
        "user":{...TheUser.rows[0]}
    
    })



      


}
module.exports=Login

