const connection_MySQL=require('../MySql/connect')
var validator=require('validator')
let {format}=require('date-fns')

require('dotenv').config()





var register=async (req,res)=>{

       const bcrypt=require('bcrypt')
       const hashedPassword= await bcrypt.hash( req.body.password,10)
       var idUser=require('crypto').randomBytes(10).toString('hex').toUpperCase()


     if  (!req.body.name  || !req.body.email || 
       !req.body.password || req.body.password.length<8 || req.body.name.length<2)  return res.sendStatus(400)

    if(!validator.isEmail(req.body.email)) return res.status(400).json({"message":`${req.body.email} is not valid email`})
    var Users=await connection_MySQL.query(`select * from "User" `)
    const emailExist=Users.rows.find(user=>user.email==req.body.email)
    if(emailExist) return res.status(400).json({"message":`${req.body.email} is already exist`})
    const phoneExist=Users.rows.find(user=>(user.phonenumber)==(req.body.phoneNumber))
    if(phoneExist) return res.status(400).json({"message":`${req.body.phoneNumber} is already exist`})
     
    
    await connection_MySQL
    .query(`INSERT INTO "User"(username, email, hashedPassword,joinedDate,idUser,phoneNumber)
     VALUES ('${req.body.name}','${req.body.email}' ,'${hashedPassword}','${format(new Date(),'yyyy-MM-dd  HH:mm:ss')}','${idUser}','${req.body.phoneNumber}');`)
     

    return res.status(201).json({"message":"created"})


    
    
  
         
        
   
               
      

               
                    
                
                
    



 




                
             
    
    
    
    
    
    
    
    
    
    
     


        
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