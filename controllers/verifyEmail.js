const connection_MySQL=require('../MySql/connect')
let {format}=require('date-fns')
let jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
var verifyEmail=async(req,res)=>{
 var verificationCodeSent=req.body.verificationCode

 
 var verCode=req.cookies.verCode
 var userInfo=req.cookies.userInfo
 var idUser=require('crypto').randomBytes(30).toString('hex').toUpperCase()


 var match=await bcrypt.compare(verificationCodeSent,verCode)
 console.log(match)
 if(!match) return res.sendStatus(401)
 
 const hashedPassword= await bcrypt.hash( userInfo.password,10)
 await connection_MySQL
 .query(`INSERT INTO users ( username, email, password,createdDate,idUser)
  VALUES ( ?,? ,?,?,? );`,[userInfo.username,userInfo.email,hashedPassword,format(new Date(),'yyyy-MM-dd  HH:mm:ss'),idUser])

 


 

 //! login 


                
                
                let access_token=jwt.sign(
                    {
                        "userInfo":{
                        "email": userInfo.email,
                        "username":userInfo.username,
                        "idUser":userInfo.idUser
                      
            
                        }
                    },process.env.ACCESS_TOKEN_SECRET,{
                        expiresIn:"30s"
                    }
                  )
                  
                  
                  let refresh_token=jwt.sign(
                    {
                        "userInfo":{
                        "email": userInfo.email,
                        "username":userInfo.username,
                        "idUser":userInfo.idUser,
                        }
                    },process.env.refresh_TOKEN_SECRET,{
                        expiresIn:"1d"
                    }
                  )                  
                  
                  connection_MySQL.query(`insert into login (refreshToken,username) values ('${refresh_token}','${userInfo.username}')`)
                  res.cookie('refreshToken',refresh_token,{httpOnly:true,maxAge:24*60*60*1000,sameSite:'None',secure:true})//! ,sameSite:'None',secure:true
                  return res.json({
                    "access_token":access_token,
                    "user":userInfo
                
                })
 

 




     
}
module.exports=verifyEmail