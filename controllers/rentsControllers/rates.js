const connection_MySQL=require('../../MySql/connect')
let {format}=require('date-fns')


var reviewRent=async(req,res)=>{

  var idRent=req.body.idRent
  var value=req.body.value
  var text=req.body.text   || ''


  if(!idRent || ! idClient  || ! value) return res.status(400).json({message:"missing info"})
  const Rent=await connection_MySQL.query(`select * from rent where idrent='${idRent}'`)
  if(!Rent.rows[0])  return res.status(400).json({message:"idRent does not exist"})
  var idClient=Rent.rows[0].iduser
  if(!(Rent.rows[0].status=='approved')) return res.status(400).json({message:"cannot review unapproved rent"})
  const rentEndDate=new Date(Rent.rows[0].enddate)
  if((new Date())< rentEndDate) return res.status(400).json({message:"cannot review  rent before end date"})
  const reviewExist=await connection_MySQL.query(`select * from review where idrent='${idRent}' and iduser='${idClient}'`)
  if(reviewExist.rows[0]) return res.status(400).json({message:" already reviewed this rent"})
  await connection_MySQL.query(`insert into review (iduser,idrent,value,text) values (
          '${idClient}','${idRent}',${+value},'${text}'
);`)
 return res.json({message:'review submitted'})
}


var rateClient=async(req,res)=>{

    var idRent=req.body.idRent
    var value=req.body.value
   
  
  
    if(!idRent   || ! value) return res.status(400).json({message:"missing info"})
    const Rent=await connection_MySQL.query(`select r.iduser as idclient,a.iduser as idowner,status,enddate from rent r,apartment a
     where idrent='${idRent}' and r.idapartment=a.idapartment`)
     var idOwner=Rent.rows[0].idowner
    if(!Rent.rows[0])  return res.status(400).json({message:"idRent does not exist"})
    if(!(Rent.rows[0].status=='approved')) return res.status(400).json({message:"cannot rate client in  unapproved rent"})
    const rentEndDate=new Date(Rent.rows[0].enddate)
    if((new Date())< rentEndDate) return res.status(400).json({message:"cannot rate client in  rent before end date"})
    const reviewExist=await connection_MySQL.query(`select * from rateclient where idrent='${idRent}' and iduser='${idOwner}'`)
    if(reviewExist.rows[0]) return res.status(400).json({message:" already rated this client in this rent"})
    await connection_MySQL.query(`insert into rateclient (iduser,idrent,value) values (
            '${idOwner}','${idRent}',${+value}
  );`)
   return res.json({message:'rate submitted'})
  }
  
module.exports={reviewRent,rateClient}