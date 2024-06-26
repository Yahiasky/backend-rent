const connection=require('../../Database/connect')

const getPropAVG = require('../../functions/getPropAVG')

var HouseCategories=['Dortoir','Bungalow','villa','apartment']


var getPropsById=async(req,res)=>{
    const data=await connection.query(`SELECT p.*,U.contact FROM property p,"User" U where U.iduser=p.iduser and
    p.idproperty ='${req.params.idProperty}' ;`)
    if(!data.rows[0]) return res.json({message:'no data'})
    let FinalData=[]

    const bookDates=await connection.query(`select rentdate as startDate , enddate as endDate 
    from rent where idproperty='${data.rows[0].idproperty}' and status='approved' ; `)
    const PropAVG=await getPropAVG(data.rows[0].idproperty)
   
     FinalData.push({...data.rows[0],avg:+PropAVG,bookDates:bookDates.rows})
   
    
 
    
    
    
   return res.json(FinalData)
  


}


var getPropsByUserId=async(req,res)=>{
    const data=await connection.query(`SELECT * FROM property where iduser ='${req.params.idUser}' and availability!='deleted' ;`)
    if(!data.rows[0]) return res.json({message:'no data'})
    let FinalData=[]
    for(var i =0;i<data.rows.length;i++) {
      const bookDates=await connection.query(`select rentdate as startDate , enddate as endDate 
    from rent where idproperty='${data.rows[i].idproperty}' and status='approved' ; `)
        const PropAVG=await getPropAVG(data.rows[i].idproperty)
       
         FinalData.push({...data.rows[i],avg:+PropAVG,bookDates:bookDates.rows})
       
    
       }
   return res.json(FinalData)
  


}




var addApartment=async(req,res)=>{


if(!req.params.idUser) return res.status(400).json({"message":"idUser missing"})


  const User=await connection.query(`select * from "User" where idUser='${req.params.idUser}' ;`)
  if(!User.rows[0]) return res.status(400).json({message:'idUser does not exist'})

var idApp=require('crypto').randomBytes(10).toString('hex').toUpperCase()
if(!HouseCategories.includes(req.body.HouseType)) return res.status(402).json({message:`HouseType should be in ${HouseCategories.join('/')}` })


await   connection.query(`insert into property (idproperty,iduser,title,description,Address,Wilaya,price,category,BedsNumber,parking_spot,wifi,availability,picture) 
values ('${idApp}','${req.params.idUser}','${req.body.title || "no title"}','${req.body.Description || "no description"}','${req.body.Address}','${+req.body.Wilaya}',
'${req.body.Amount || "0$"}','${req.body.HouseType }','${+req.body.BedsNumber || 1}','${req.body.parkingSpot || 'no'}'
,'${req.body.wifi || 'no'}','available','${req.body.picture}');`)



return res.status(201).json({message:'done'})















    
}


var editApartment=async(req,res)=>{
var updates=[]
    if(!req.params.idProperty ) return res.status(402).json({message:'idProperty missing'})
    const oldProp=await connection.query(`select * from property where idproperty='${req.params.idProperty}'`)
   if(!oldProp.rows[0]) return res.status(400).json({message:"idProperty does not exist"})
    if(req.body.newCategory) {
         if(!HouseCategories.includes(req.body.newCategory)) 
           return res.status(402).json({message:`HouseType should be in ${HouseCategories.join('/')}` })

         await connection.query(`update property set category ='${req.body.newCategory}'
          where idproperty='${req.params.idProperty}'`)
           updates.push('houseCategory updated')
    }

   if(req.body.newTitle) {
    await connection.query(`update property set title ='${req.body.newTitle}'
    where idproperty='${req.params.idProperty}'`)
     updates.push('title updated')
   }

   if(req.body.newDescription) {
    await connection.query(`update property set description ='${req.body.newDescription}'
    where idproperty='${req.params.idProperty}'`)
     updates.push('Description updated')
   }
   if(req.body.newPicture) {
    await connection.query(`update property set picture ='${req.body.newPicture}'
    where idproperty='${req.params.idProperty}'`)
     updates.push('picture updated')
   }
   if(req.body.newAddress) {
    await connection.query(`update property set address ='${req.body.newAddress}'
    where idproperty='${req.params.idProperty}'`)
     updates.push('address updated')
   }
   if(req.body.newAmount) {
    await connection.query(`update property set price ='${req.body.newAmount}'
    where idproperty='${req.params.idProperty}'`)
     updates.push('Amount updated')
   }
   if(req.body.newWilaya) {
    await connection.query(`update property set wilaya ='${+req.body.newWilaya}'
    where idproperty='${req.params.idProperty}'`)
     updates.push('Wilaya updated')
   }
   if(req.body.newBedsNumber) {
    await connection.query(`update property set BedsNumber ='${req.body.newBedsNumber}'
    where idproperty='${req.params.idProperty}'`)
     updates.push('BedsNumber updated')
   }

   if(req.body.hasWifi) {
    await connection.query(`update property set wifi ='${req.body.hasWifi}'
    where idproperty='${req.params.idProperty}'`)
     updates.push('wifi updated')
   }
   if(req.body.hasParkingSpot) {
    await connection.query(`update property set parking_spot ='${req.body.hasParkingSpot}'
    where idproperty='${req.params.idProperty}'`)
     updates.push('hasParkingSpot updated')
   }




   const newProp=await connection.query(`select * from property where idproperty='${req.params.idProperty}'`)
   
    var updatesToString=updates.join('/')
    const PropAvg=await getPropAVG(req.params.idProperty)
   return res.status(200).json({message:updatesToString,newProp:{...newProp.rows[0],avg:PropAvg}})
 
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        
    }
var deleteProp=async(req,res)=>{
    if(!req.params.idProperty ) return res.status(402).json({message:'idProperty missing'})
    await connection.query(`update property set availability='deleted'  WHERE idproperty='${req.params.idProperty}' `)
   return res.sendStatus(200)
}
module.exports={addApartment,getPropsById,getPropsByUserId,editApartment,deleteProp}