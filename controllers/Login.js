const connection=require('../Database/connect')

let bcrypt=require('bcrypt')


const Login=async (req,res)=>{

   
   
    if(!req.body.email || !req.body.password) return res.status(400).json({"message":"username & password are required"})
      
  
  
      
     const TheUser=await connection.query(`select * from "User" where email='${req.body.email}'`)
    
    
     if(!TheUser.rows[0]) return res.status(403).json({"message":"invalid email"})
     
      const match=await bcrypt.compare(req.body.password,TheUser.rows[0].hashedpassword)
      if(!match) return res.status(401).json({"message":"password incorrect"})
   
     
   

      return res.json({
        "access_token":{},
        "user":{...TheUser.rows[0]}
    
    })



      


}
module.exports=Login

