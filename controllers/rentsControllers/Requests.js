const connection_MySQL=require('../../MySql/connect')
let {format}=require('date-fns')
const getPropAVG = require('../../functions/getPropAVG')
const { getClientRate } = require('../../functions/getUserAVG')
const { request } = require('http')
const getPropPics = require('../../functions/getPropPictures')


var getOwnerRequests=async(req,res)=>{

 var idOwner= req.params.idOwner
 if(!idOwner) return res.status(400).json({message:'idOwner missing'})
 var Owner=await connection_MySQL.query(`select * from "User" where idUser='${idOwner}'`)
 if(!Owner.rows[0]) return res.status(400).json({message:'idOwner does not exist'})

 var OwnerRequests=await connection_MySQL.query(`select r.idUser as idClient,a.idproperty,idrequest as idrent,
 title,description,picture,rentdate,enddate
  from request r,property a where r.idproperty=a.idproperty
 and  a.idUser='${idOwner}'  ; `)
 var OwnerRequestsFullData=[]

 
// for(var i =0;i<OwnerRequests.rows.length;i++){
  
//   if((new Date(OwnerRequests.rows[i].rentdate)) < (new Date())) {
// await connection_MySQL.query(`update rent set status='date passed' where idrent='${OwnerRequests.rows[i].idrent}'`)

//  OwnerRequests=await connection_MySQL.query(`select r.idUser as idClient,a.idproperty,idrent,
// title,description,rentdate,enddate
//  from rent r,property a where r.idproperty=a.idproperty
//  and  a.idUser='${idOwner}' and status='pending' ; `)
//   }




//  }

 for(var i =0;i<OwnerRequests.rows.length;i++) {
  var clientData=await connection_MySQL.query(`select username,contact,rateasclient as clientRate,profilepictureurl from "User" 
  where idUser='${OwnerRequests.rows[i].idclient}'`)





  const PropAVG=await getPropAVG(OwnerRequests.rows[i].idproperty)
 
                                                     
  OwnerRequestsFullData.push({
   ...(clientData.rows[0]),
   ...(OwnerRequests.rows[i]),
   PropertyRate:PropAVG
 


  })




 }



 
 return res.json(OwnerRequestsFullData)
}

var approveRequest=async(req,res)=>{
   var idRequest=req.params.idRent
   if(!idRequest) return   res.status(400).json({message:'idRequest missing'})
   const Request=await connection_MySQL.query(`select * from request where idrequest='${idRequest}' `)
   if(!Request.rows[0]) return res.status(400).json({message:'idRequest does not exist'})

   await connection_MySQL.query(`insert into rent (idrent,iduser,rentdate,idproperty,enddate,price) values (
  '${require('crypto').randomBytes(10).toString('hex').toUpperCase()}','${Request.rows[0].iduser}'
  ,'${Request.rows[0].rentdate}','${Request.rows[0].idproperty}','${Request.rows[0].enddate}','${Request.rows[0].price}'

   );`)

   await connection_MySQL.query(`delete from request where idrequest='${idRequest}'`)
 return res.status(200).json({message:'rent approved , make sure you contact the client '})

}

var rejectRequest=async(req,res)=>{
    var idRequest=req.params.idRent
    if(!idRequest) return   res.status(400).json({message:'idRent missing'})
    const Request=await connection_MySQL.query(`select * from request where idrequest='${idRequest}' `)
    if(!Request.rows[0]) return res.status(400).json({message:'idrent does not exist or the rent is not pending'})
      await connection_MySQL.query(`insert into rent (idrent,iduser,rentdate,idproperty,enddate,price,status) values (
         '${require('crypto').randomBytes(10).toString('hex').toUpperCase()}','${Request.rows[0].iduser}'
         ,'${Request.rows[0].rentdate}','${Request.rows[0].idproperty}','${Request.rows[0].enddate}','${Request.rows[0].price}'
       ,'rejected'
          );`)
    await connection_MySQL.query(`delete from request where idrequest='${idRequest}'`)
  return res.status(200).json({message:'rent rejected  '})
 
 }

 var getClientRequests=async(req,res)=>{
    var idClient=req.params.idClient
    if(!idClient) return   res.status(400).json({message:'idClient missing'})
    const Client=await connection_MySQL.query(`select * from "User" where idUser='${idClient}' ;`)
    if(!Client.rows[0]) return res.status(400).json({message:'idClient does not exist'})
    var ClientRents=await connection_MySQL.query(`select idRent,rent.idproperty,title,picture,rent.price,description,picture,rentdate,enddate ,status,property.iduser as idowner
from rent , property
where rent.idproperty=property.idproperty and rent.idUser='${idClient}';`)
   var ClientRequests=await connection_MySQL.query(`select idrequest as idrent,property.iduser as idowner,picture,property.price,request.idproperty,title,description,rentdate,enddate 
   from request , property
   where request.idproperty=property.idproperty and request.idUser='${idClient}';`)


//  for(var i =0;i<ClientRequests.rows.length;i++){
  

//   if((new Date(ClientRequests.rows[i].rentdate)) < (new Date()) ) {
//  await connection_MySQL.query(`delete from request where idrequest='${ClientRequests.rows[i].idrent}'`)
//  await connection_MySQL.query(`insert into rent (idrent,iduser,rentdate,idproperty,enddate,price,status) values (
//    '${require('crypto').randomBytes(10).toString('hex').toUpperCase()}','${ClientRequests.rows[i].iduser}'
//    ,'${ClientRequests.rows[i].rentdate}','${ClientRequests.rows[i].idproperty}','${ClientRequests.rows[i].enddate}','${ClientRequests.rows[i].price}'
//  ,'date passed'
//     );`)
   
//     }




//   }

   var result=[]
   for(var i =0;i<ClientRequests.rows.length;i++){
      let profilepictureurl=await connection_MySQL.query(`select profilepictureurl from "User" where idUser='${ClientRequests.rows[i].idowner}' ;`)
      result.push({
         ...ClientRequests.rows[i],
         status:'pending',profilepictureurl:profilepictureurl.rows[0]["profilepictureurl"]
      }) 
   }
   //  ClientRequests.rows.map(e=>{
      
   //    result.push({
   //       ...e,
   //       status:'pending'
   //    })
   //  })

   for(var i =0;i<ClientRents.rows.length;i++){
      let profilepictureurl=await connection_MySQL.query(`select profilepictureurl from "User" where idUser='${ClientRents.rows[i].idowner}' ;`)
      result.push({
         ...ClientRents.rows[i],
         profilepictureurl:profilepictureurl.rows[0]["profilepictureurl"]
      }) 
   }
   //  ClientRents.rows.map(e=>{
   //    result.push(
   //    e
   //    )
   //  })
    
   var ClientRequestsFulldata=[]
   for(var i =0;i<result.length;i++) {
    var rentReviewed=await  connection_MySQL.query(`select * from review 
    where idrent='${result[i].idrent}' and iduser='${idClient}'`)

 var PropAVG=await getPropAVG(result[i].idproperty)

  ClientRequestsFulldata.push({...result[i],PropsRate:PropAVG,yourReview:rentReviewed.rows[0] || {}})
  console.log(rentReviewed.rows[0])
   }
  return res.status(200).json(ClientRequestsFulldata)
 
 }

 var cancelRequest=async(req,res)=>{
    var idRequest=req.params.idRent
   if(!idRequest) return   res.status(400).json({message:'idRequest missing'})
   const Rent=await connection_MySQL.query(`select * from request where idrequest='${idRequest}' `)
   if(!Rent.rows[0]) return res.status(400).json({message:'idRequest does not exist '})
   await connection_MySQL.query(`delete from request where idrequest='${idRequest}'`)
   return res.status(200).json({message:'rent canceled  '})


 }
module.exports={getOwnerRequests,approveRequest,rejectRequest,getClientRequests,cancelRequest}