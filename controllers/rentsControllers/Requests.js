const connection_MySQL=require('../../MySql/connect')
let {format}=require('date-fns')
const getPropAVG = require('../../functions/getPropAVG')
const { getClientRate } = require('../../functions/getUserAVG')
const { request } = require('http')


var getOwnerRequests=async(req,res)=>{

 var idOwner= req.params.idOwner
 if(!idOwner) return res.status(400).json({message:'idOwner missing'})
 var Owner=await connection_MySQL.query(`select * from "User" where idUser='${idOwner}'`)
 if(!Owner.rows) return res.status(400).json({message:'idOwner does not exist'})

 var OwnerRequests=await connection_MySQL.query(`select r.idUser as idClient,a.idproperty,idrequest,
 title,description,rentdate,enddate
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
  var clientData=await connection_MySQL.query(`select username,contact,rateasclient as clientRate from "User" 
  where idUser='${OwnerRequests.rows[i].idclient}'`)

  const clientRate=await getClientRate(OwnerRequests.rows[i].idclient)



  const PropAVG=await getPropAVG(OwnerRequests.rows[i].idproperty)
  const pics= await connection_MySQL.query(`select pic_url from picture where idproperty='${OwnerRequests.rows[i].idproperty}'`)
                                                     
  OwnerRequestsFullData.push({
   ...(clientData.rows[0]),
   ...(OwnerRequests.rows[i]),
   PropertyRate:PropAVG,
   picture:pics.rows[0]['pic_url']


  })




 }



 
 return res.json(OwnerRequestsFullData)
}

var approveRequest=async(req,res)=>{
   var idRequest=req.params.idRent
   if(!idRequest) return   res.status(400).json({message:'idRequest missing'})
   const Request=await connection_MySQL.query(`select * from request where idrequest='${idRequest}' `)
   if(!Request.rows[0]) return res.status(400).json({message:'idRequest does not exist'})
   console.log(Request.rows[0])
   await connection_MySQL.query(`insert into rent (idrent,iduser,rentdate,idproperty,enddate) values (
  '${require('crypto').randomBytes(10).toString('hex').toUpperCase()}','${Request.rows[0].iduser}'
  ,'${Request.rows[0].rentdate}','${Request.rows[0].idproperty}','${Request.rows[0].enddate}'
  
   );`)
   await connection_MySQL.query(`delete from request where idrequest='${idRequest}'`)
 return res.status(200).json({message:'rent approved , make sure you contact the client '})

}

var rejectRequest=async(req,res)=>{
    var idRequest=req.params.idRent
    if(!idRequest) return   res.status(400).json({message:'idRent missing'})
    const Rent=await connection_MySQL.query(`select * from request where idrequest='${idRequest}' `)
    if(!Rent.rows[0]) return res.status(400).json({message:'idrent does not exist or the rent is not pending'})
    await connection_MySQL.query(`delete from request where idrequest='${idRequest}'`)
  return res.status(200).json({message:'rent rejected  '})
 
 }

 var getClientRequests=async(req,res)=>{
    var idClient=req.params.idClient
    if(!idClient) return   res.status(400).json({message:'idClient missing'})
    const Client=await connection_MySQL.query(`select * from "User" where idUser='${idClient}' ;`)
    if(!Client.rows[0]) return res.status(400).json({message:'idClient does not exist'})
    var ClientRents=await connection_MySQL.query(`select idRent,rent.idproperty,title,description,rentdate,enddate 
from rent , property
where rent.idproperty=property.idproperty and rent.idUser='${idClient}';`)
   var ClientRequests=await connection_MySQL.query(`select * from request where iduser='${idClient}'`)

//  for(var i =0;i<ClientRequests.rows.length;i++){
  

//   if((new Date(ClientRequests.rows[i].rentdate)) < (new Date()) && ClientRequests.rows[i].status=='pending') {
//  await connection_MySQL.query(`update rent set status='date passed' where idrent='${ClientRequests.rows[i].idrent}'`)
   
//     }




//   }
   var ClientRequestsFulldata=[]
   for(var i =0;i<ClientRents.rows.length;i++) {
    var rentReviewed=await  connection_MySQL.query(`select * from review 
    where idrent='${ClientRents.rows[i].idrent}' and iduser='${idClient}'`)

 var PropAVG=await getPropAVG(ClientRents.rows[i].idproperty)
  ClientRequestsFulldata.push({...ClientRents.rows[i],PropsRate:PropAVG,yourReview:rentReviewed.rows[0]})

   }
  return res.status(200).json({rents:ClientRequestsFulldata,requests:ClientRequests.rows})
 
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