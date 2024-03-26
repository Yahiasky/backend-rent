const connection_MySQL=require('../MySql/connect')
let jwt=require('jsonwebtoken')
const AccessToken=async(req,res) =>{

    const cookie=req.cookies
    if(!cookie?.refreshToken) return res.sendStatus(403)
    const refresh_token=cookie.refreshToken

    const [login] = await connection_MySQL.query(`select * from login where refreshToken='${refresh_token}'`)
    if(!login[0]) return res.sendStatus(403)
    
    const [TheUser] = await connection_MySQL.query(`select * from user where idUser=?`,[login[0].idUser])

 
    let access_token=jwt.sign(
        {
            "userInfo":{
            "email": TheUser[0].email,
            "username":TheUser[0].username,
            "idUser":TheUser[0].idUser,
            "Role":TheUser[0].role

            }
        },process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:"30s"
        }
      )
      return res.status(201).json(access_token)



      

}
module.exports=AccessToken