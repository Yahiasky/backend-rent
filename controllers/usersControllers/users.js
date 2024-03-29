const connection_MySQL=require('../../MySql/connect')






var getUsers=async (req,res)=>{
    
    
    const [data]=await connection_MySQL.query(`SELECT * FROM User ;`)
    res.json(data)

}


var getUser=async(req,res)=>{

   
    const rateAVG_asClient=await connection_MySQL.query(`SELECT AVG(value) FROM rateClient,rent 
    where rent.idUser ='${req.params.idUser}' and rateClient.idRent=rent.idRent ;`)
   const rateAVG_asOwner=await connection_MySQL.query(`SELECT U.idUser, AVG(temp.rateAVG) AS UserRate
   FROM User U 
   JOIN (
       SELECT A.idUser, AVG(RV.value) AS rateAVG
       FROM apartment A 
       JOIN rent R ON A.idApartment = R.idApartment
       JOIN Review RV ON R.idRent = RV.idRent
       GROUP BY A.idUser
   ) AS temp ON U.idUser = temp.idUser
   GROUP BY U.idUser;
   
   `)
   console.log(rateAVG_asOwner)
   const data=await connection_MySQL.query(`SELECT * FROM User where idUser ='${req.params.idUser}' ;`)
   var [FinalData]=data[0]
  return FinalData==null ? res.sendStatus(204) :res.json({userData:FinalData,userRateAsClient:rateAVG_asClient[0]})
   

}


var deleteUser=async(req,res)=>{
  
  
   await connection_MySQL.query(`delete   FROM  apartment  WHERE idUser ='${req.params.idUser}' `)
   await connection_MySQL.query(`delete   FROM User WHERE User.idUser ='${req.params.idUser}' `)

    
    



     res.json({
        "message":"deleted !"
     })





    
}




module.exports={getUsers,deleteUser,getUser}