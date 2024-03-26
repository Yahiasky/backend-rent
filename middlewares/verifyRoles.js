const verifyRoles=(...AllowedRoles)=>{


    return (req,res,next)=>{
        
    if(!req?.Role) return res.sendStatus(403)
    
    const Allowedroles=[...AllowedRoles]
    if(!Allowedroles.includes(req.Role)) return res.sendStatus(403)
    next()
    }
}
module.exports=verifyRoles
