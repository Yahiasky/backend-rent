const connection_MySQL=require('../MySql/connect')
var validator=require('validator')
let {format}=require('date-fns')
const nodemailer=require('nodemailer')
require('dotenv').config()
const uuid=require('uuid')




var register=async (req,res)=>{

       const bcrypt=require('bcrypt')
       const hashedPassword= await bcrypt.hash( req.body.password,10)
       var idUser=require('crypto').randomBytes(10).toString('hex').toUpperCase()


     if  (!req.body.name  || !req.body.email || 
       !req.body.password || req.body.password.length<8 || req.body.username.length<2)  return res.sendStatus(400)

    if(!validator.isEmail(req.body.email)) return res.status(400).json({"message":`${req.body.email} is not valid email`})
    var [Users]=await connection_MySQL.query(`select * from User `)
    const usernameExist=Users.find(user=>user.username==req.body.name)
    if(usernameExist) return res.status(400).json({"message":`${req.body.name} is already exist`})
     

    await connection_MySQL
    .query(`INSERT INTO User ( username, email, hashedPassword,joinedDate,idUser)
     VALUES ( ?,? ,?,?,? );`,[req.body.name,req.body.email,hashedPassword,format(new Date(),'yyyy-MM-dd  HH:mm:ss'),idUser])
     if(req.body.phoneNumber) 
     await connection_MySQL.query(`update User set phoneNumber =${+req.body.phoneNumber} where idUser='${idUser}'`)

    return res.status(201).json({"message":"created"})
//     const transporter=nodemailer.createTransport({
//       service:process.env.nodemailer_service,
//       auth:{
//           user:process.env.Email,
//           pass:process.env.Email_password
//       },
//       debug: true
//    })
    
  
//    const verificationCode=require('crypto').randomBytes(3).toString('hex').toUpperCase()
   
//    const mailOption={
//       from:process.env.Email,
//       to:req.body.email,
//       subject:'email verification',
//       text:`your verification code is ${verificationCode}`
//    }
  

//    try{
//       await  transporter.sendMail(mailOption)
//       var userInfo={
//         username:req.body.username,
//         email:req.body.email,
//         password:req.body.password
//       }
//       var hash=await bcrypt.hash(verificationCode,10)
//       res.cookie('userInfo',userInfo,{httpOnly:true,maxAge:60*60*1000})
//       res.cookie('verCode',hash,{httpOnly:true,maxAge:60*60*1000})
//  console.log(verificationCode)
//       return res.sendStatus(201)
  
 
//    }
//   catch(err){
//   console.log(err)
//       return res.sendStatus(500)
//   }

    
    
  
         
        
   
               
      

               
                    
                
                
    



 




                
             
    
    
    
    
    
    
    
    
    
    
     


        
    // }

    //  else{
    //    connection_MySQL.query(`INSERT INTO error ( typeErr, contentErr) VALUES ( '500','miss info to post user' );`)
    //    res.status(500)
    //    .json({
    //     "message":"you must to send all information {firstname,lastname,email,password}"
    //     })
    //   }
}

module.exports=register