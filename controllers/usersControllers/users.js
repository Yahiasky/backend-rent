const connection_MySQL=require('../../MySql/connect')
const average = require('../../functions/maths')






var getUsers=async (req,res)=>{
    
    
    const [data]=await connection_MySQL.query(`SELECT * FROM User ;`)
    res.json(data)

}


var getUser=async(req,res)=>{

   
    const rateAVG_asClient=await connection_MySQL.query(`SELECT AVG(value) FROM rateClient,rent 
    where rent.idUser ='${req.params.idUser}' and rateClient.idRent=rent.idRent ;`)
   var userProps=await connection_MySQL.query(`select idApartment from apartment where idUser='${req.params.idUser}'`)
   userProps=userProps[0].map(e=>e.idApartment)

   var  userPropsAVG=[]
   for(var i =0;i<userProps.length;i++) {
    const PropAVG=await connection_MySQL.query(`select AVG(value) from rent,Review 
                                             where rent.idRent=Review.idRent and idApartment='${userProps[i]}'`)
    if(PropAVG[0][0]['AVG(value)']) userPropsAVG.push(+PropAVG[0][0]['AVG(value)'])
    

   }

   var userAVG_asOwner=average(userPropsAVG)

   console.log(userPropsAVG)

   const data=await connection_MySQL.query(`SELECT * FROM User where idUser ='${req.params.idUser}' ;`)
   var [FinalData]=data[0]
  return FinalData==null ? res.sendStatus(204) :res.json({userData:FinalData,
    userRateAsClient:+rateAVG_asClient[0][0]['AVG(value)'], userRateAsOwner:userAVG_asOwner}
   )
   

}


var deleteUser=async(req,res)=>{
  
  
   await connection_MySQL.query(`delete   FROM  apartment  WHERE idUser ='${req.params.idUser}' `)
   await connection_MySQL.query(`delete   FROM User WHERE User.idUser ='${req.params.idUser}' `)

    
    



     res.json({
        "message":"deleted !"
     })





    
}




module.exports={getUsers,deleteUser,getUser}