const connection_MySQL=require('../MySql/connect')

const logout=async(req,res)=>{

    // const cookie=req.cookies
    // if(!cookie?.refreshToken) return res.sendStatus(204)
    // const refresh_token=cookie.refreshToken
    const [TheUser] = await connection_MySQL.query(`select * from login where idUser='${req.params.idUser}'`)
    if(!TheUser[0]) return res.sendStatus(204)
    // res.clearCookie('refreshToken',{httpOnly:true,sameSite:'None',secure:true})
    connection_MySQL.query(`delete from login where username= '${req.params.idUser}'`)
    return res.sendStatus(200)

    
}
module.exports=logout