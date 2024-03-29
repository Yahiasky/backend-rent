const connection_MySQL=require('../../MySql/connect')






var getUsers=async (req,res)=>{
    
    
    const [data]=await connection_MySQL.query(`SELECT * FROM User ;`)
    res.json(data)

}


var getUser=async(req,res)=>{

  
   const data=await connection_MySQL.query(`SELECT * FROM User where idUser ='${req.params.idUser}' ;`)
   var [FinalData]=data[0]
  return FinalData==null ? res.sendStatus(204) :res.json(FinalData)
   

}


var deleteUser=async(req,res)=>{
  
  
   await connection_MySQL.query(`delete   FROM  apartment  WHERE idUser ='${req.params.idUser}' `)
   await connection_MySQL.query(`delete   FROM User WHERE User.idUser ='${req.params.idUser}' `)

    
    



     res.json({
        "message":"deleted !"
     })





    
}




module.exports={getUsers,deleteUser,getUser}