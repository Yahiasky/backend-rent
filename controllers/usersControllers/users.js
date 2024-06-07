const connection=require('../../Database/connect')







var getUsers=async (req,res)=>{
    
  
    const data=await connection.query(`SELECT * FROM "User" ;`)
    res.json(data.rows)

}


var getUser=async(req,res)=>{

   
   

   const data=await connection.query(`SELECT * FROM "User" where idUser ='${req.params.idUser}' ;`)
   var FinalData=data.rows[0]
  return FinalData==null ? res.sendStatus(204) :res.json({userData:FinalData}
   )
   

}


var deleteUser=async(req,res)=>{
   await connection.query(`update property set availability='deleted'  WHERE idUser ='${req.params.idUser}' `)
   await connection.query(`update property set idUser=null  WHERE idUser ='${req.params.idUser}' `)
   await connection.query(`update rent set idUser=null  WHERE idUser ='${req.params.idUser}' `)
   await connection.query(`update rateclient set idUser=null  WHERE idUser ='${req.params.idUser}' `)
   await connection.query(`update review set idUser=null  WHERE idUser ='${req.params.idUser}' `)
   await connection.query(`delete   FROM "User" WHERE "User".idUser ='${req.params.idUser}' `)

     res.json({
        "message":"deleted !"
     })





    
}




module.exports={getUsers,deleteUser,getUser}