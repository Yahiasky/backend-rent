const connection_MySQL=require('../../MySql/connect')
let bcrypt=require('bcrypt')
var validator=require('validator')

var updateUser=async(req,res)=>{
    if(!req.params.idUser ) return res.status(402).json({message:'idUser missing'})
    if(!req.body.password ) return res.status(401).json({message:'password required'})
    const [TheUser]=await connection_MySQL.query(`select * from User where idUser='${req.params.idUser}'`)
    
     if(!TheUser[0]) return res.status(403).json({"message":"user not found"})
     
     const match=await bcrypt.compare(req.body.password,TheUser[0].hashedPassword)
      if(!match) return res.status(401).json({"message":"password incorrect"})
    
    var updates=[]
    if(req.body.newUsername){
        var [Users]=await connection_MySQL.query(`select * from User `)
        const usernameExist=Users.find(user=>user.username==req.body.username)
        if(usernameExist) return res.status(400).json({"message":`${req.body.username} is already exist`})
        await connection_MySQL.query(`update User set username ='${req.body.newUsername}' where idUser='${req.params.idUser}'`)
        updates.push('username updated')
    }
    if(req.body.newEmail){
        if(!validator.isEmail(req.body.newEmail)) return res.status(400).json({"message":`${req.body.newEmail} is not valid email`})
        await connection_MySQL.query(`update User set email ='${req.body.newEmail}' where idUser='${req.params.idUser}'`)
        updates.push('email updated')
    }
    if(req.body.newPassword){
     
        const hashedPassword= await bcrypt.hash( req.body.newPassword,10)
        await connection_MySQL.query(`update User set hashedPassword ='${hashedPassword}' where idUser='${req.params.idUser}'`)
        updates.push('password  updated')
    }
    const [newUser]=await connection_MySQL.query(`select * from User where idUser='${req.params.idUser}'`)
    var updatesToString=updates.join('/')
    
   return res.status(200).json({message:updatesToString,newUser:newUser[0]})

}

module.exports={updateUser}