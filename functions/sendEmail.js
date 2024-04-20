const nodemailer=require('nodemailer')
   
 var sendEmail=async(EmailTo,Subject,Text)=>{
    const transporter=nodemailer.createTransport({
        service:process.env.nodemailer_service,
        auth:{
            user:process.env.Email,
            pass:process.env.Email_password
        },
        debug: true
     })
      
    
     
     
     const mailOption={
        from:process.env.Email,
        to:EmailTo,
        subject:Subject,
        text:Text
     }
    
  
    
        await  transporter.sendMail(mailOption)
      
   
 
 }  
 
 module.exports=sendEmail