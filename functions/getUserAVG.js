const connection=require('../Database/connect');
const getPropAVG = require('./getPropAVG');
const average = require('./maths');

var getClientRate=async(UserId)=>{


    const clientRate=await connection.query(`SELECT AVG(value) FROM rateClient,rent 
    where rent.idUser ='${UserId}'
     and rateClient.idRent=rent.idRent   ;`)

     return clientRate.rows[0].avg;
}
var getOwnerRate=async(UserId)=>{


   
   var userProps=await connection.query(`select idproperty from property where idUser='${UserId}'`)

   userProps=userProps.rows.map(e=>e.idproperty)

   var  userPropsAVG=[]
   for(var i =0;i<userProps.length;i++) {
    const PropAVG=await getPropAVG(userProps[i])
    if(PropAVG) userPropsAVG.push(PropAVG)
  

   }

   var userAVG_asOwner=average(userPropsAVG)
   return userAVG_asOwner
}
module.exports={getClientRate,getOwnerRate}