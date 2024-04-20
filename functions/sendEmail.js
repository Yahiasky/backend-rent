const nodemailer=require('nodemailer')
const { Email, Email_password, nodemailer_service } = require('../data/info')
   
 var sendEmail=async(EmailTo,Subject,Text)=>{
    const transporter=nodemailer.createTransport({
        service:nodemailer_service,
        auth:{
            user:Email,
            pass:Email_password
        },
        debug: true
     })
      
    
     
     
     const mailOption={
        from:Email,
        to:EmailTo,
        subject:Subject,
        text:Text
     }
    
  
    
        await  transporter.sendMail(mailOption)
      
   
 
 }  
 
 module.exports=sendEmail