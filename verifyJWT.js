const jwt=require('jsonwebtoken')
require('dotenv').config()
var verifyJwt=(request,response,next)=>{
   
        let authHeader= request.headers.authorization || request.headers.Authorization
        if(!authHeader?.startsWith('Bearer ')) return response.sendStatus(401)
        
        let token=authHeader.split(' ')[1]
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err,decoded)=>{
                if(err) return response.sendStatus(403)
                request.email=decoded.userInfo.email
                request.username=decoded.userInfo.username
                request.Role=decoded.userInfo.Role
                request.idUser=decoded.userInfo.idUser
                
                next()
            }
        )
}

module.exports=verifyJwt