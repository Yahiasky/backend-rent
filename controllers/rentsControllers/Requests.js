const connection_MySQL=require('../../MySql/connect')
let {format}=require('date-fns')
const getPropAVG = require('../../functions/getPropAVG')


var getOwnerRequests=async(req,res)=>{

 var idOwner= req.params.idOwner
 if(!idOwner) return res.status(400).json({message:'idOwner missing'})
 var Owner=await connection_MySQL.query(`select * from "User" where idUser='${idOwner}'`)
 if(!Owner.rows) return res.status(400).json({message:'idOwner does not exist'})

 var OwnerRequests=await connection_MySQL.query(`select r.idUser as idClient,a.idapartment,idrent,
 title,description,rentdate,enddate
  from rent r,apartment a where r.idapartment=a.idapartment
 and  a.idUser='${idOwner}' and status='pending' ; `)
 var OwnerRequestsFullData=[]

 
//  for(var i =0;i<OwnerRequests.rows.length;i++){
  

//   if((new Date(OwnerRequests.rows[i].rentdate)) < (new Date())) {
// await connection_MySQL.query(`update rent set status='date passed' where idrent='${OwnerRequests.rows[i].idrent}'`)

// OwnerRequests=await connection_MySQL.query(`select r.idUser as idClient,a.idapartment,idrent,
// title,description,rentdate,enddate
//  from rent r,apartment a where r.idapartment=a.idapartment
// and  a.idUser='${idOwner}' and status='pending' ; `)
//   }




// }

 for(var i =0;i<OwnerRequests.rows.length;i++) {
  var clientData=await connection_MySQL.query(`select username,contact from "User" 
  where idUser='${OwnerRequests.rows[i].idclient}'`)

  const clientRate=await connection_MySQL.query(`SELECT AVG(value) FROM rateClient,rent 
                                                    where rent.idUser ='${OwnerRequests.rows[i].idclient}'
                                                     and rateClient.idRent=rent.idRent  and status='approved' ;`)



  const PropAVG=await connection_MySQL.query(`select AVG(value) from rent,review 
                                                     where rent.idrent=review.idrent 
                                                     and idapartment='${OwnerRequests.rows[i].idapartment}'
                                                     and status='approved'`)
  const pics= await connection_MySQL.query(`select pic_url from picture where idapartment='${OwnerRequests.rows[i].idapartment}'`)
                                                     
  OwnerRequestsFullData.push({
   ...(clientData.rows[0]),
   clientRate:clientRate.rows[0].avg,
   ...(OwnerRequests.rows[i]),
   PropertyRate:PropAVG.rows[0].avg,
   picture:pics.rows[0]['pic_url']


  })




 }



 
 return res.json(OwnerRequestsFullData)
}

var approveRequest=async(req,res)=>{
   var idRent=req.params.idRent
   if(!idRent) return   res.status(400).json({message:'idRent missing'})
   const Rent=await connection_MySQL.query(`select * from rent where idrent='${idRent}' and status='pending'`)
   if(!Rent.rows[0]) return res.status(400).json({message:'idrent does not exist or the rent is not pending'})
   await connection_MySQL.query(`update rent set status='approved' where idrent='${idRent}'`)
 return res.status(200).json({message:'rent approved , make sure you contact the client '})

}

var rejectRequest=async(req,res)=>{
    var idRent=req.params.idRent
    if(!idRent) return   res.status(400).json({message:'idRent missing'})
    const Rent=await connection_MySQL.query(`select * from rent where idrent='${idRent}' and status='pending'`)
    if(!Rent.rows[0]) return res.status(400).json({message:'idrent does not exist or the rent is not pending'})
    await connection_MySQL.query(`update rent set status='rejected' where idrent='${idRent}'`)
  return res.status(200).json({message:'rent rejected  '})
 
 }

 var getClientRequests=async(req,res)=>{
    var idClient=req.params.idClient
    if(!idClient) return   res.status(400).json({message:'idClient missing'})
    const Client=await connection_MySQL.query(`select * from "User" where idUser='${idClient}' ;`)
    if(!Client.rows[0]) return res.status(400).json({message:'idClient does not exist'})
    var ClientRequests=await connection_MySQL.query(`select idRent,status,rent.idapartment,title,description,rentdate,enddate 
from rent , apartment
where rent.idapartment=apartment.idapartment and rent.idUser='${idClient}';`)

// for(var i =0;i<ClientRequests.rows.length;i++){
  

//   if((new Date(ClientRequests.rows[i].rentdate)) < (new Date()) && ClientRequests.rows[i].status=='pending') {
// await connection_MySQL.query(`update rent set status='date passed' where idrent='${ClientRequests.rows[i].idrent}'`)
   
//   }




// }
   var ClientRequestsFulldata=[]
   for(var i =0;i<ClientRequests.rows.length;i++) {
    var rentReviewed=await  connection_MySQL.query(`select * from review 
    where idrent='${ClientRequests.rows[i].idrent}' and iduser='${idClient}'`)

 var PropAVG=await getPropAVG(ClientRequests.rows[i].idapartment)
  ClientRequestsFulldata.push({...ClientRequests.rows[i],PropsRate:PropAVG,yourReview:rentReviewed.rows[0]})

   }
  return res.status(200).json(ClientRequestsFulldata)
 
 }

 var cancelRequest=async(req,res)=>{
    var idRent=req.params.idRent
   if(!idRent) return   res.status(400).json({message:'idRent missing'})
   const Rent=await connection_MySQL.query(`select * from rent where idrent='${idRent}' and status='pending'`)
   if(!Rent.rows[0]) return res.status(400).json({message:'idrent does not exist or the rent is not pending'})

   await connection_MySQL.query(`update rent set status='canceled' where idrent='${idRent}'`)
   return res.status(200).json({message:'rent canceled  '})


 }
module.exports={getOwnerRequests,approveRequest,rejectRequest,getClientRequests,cancelRequest}