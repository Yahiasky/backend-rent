const connection_MySQL=require('../../MySql/connect')
let {format}=require('date-fns')
const getPropAVG = require('../../functions/getPropAVG')
const getPropPics = require('../../functions/getPropPictures')
var HouseCategories=['Dortoir','Bungalow','villa','apartment']


var getPropsById=async(req,res)=>{
    const data=await connection_MySQL.query(`SELECT p.*,U.contact FROM property p,"User" U where U.iduser=p.iduser and
    p.idproperty ='${req.params.idProperty}' ;`)
    if(!data.rows[0]) return res.json({message:'no data'})
    let FinalData=[]

    const bookDates=await connection_MySQL.query(`select rentdate as startDate , enddate as endDate 
    from rent where idproperty='${data.rows[0].idproperty}' ; `)
    const PropAVG=await getPropAVG(data.rows[0].idproperty)
    const pics= await getPropPics(data.rows[0].idproperty)
     FinalData.push({...data.rows[0],avg:+PropAVG,picture:(pics),bookDates:bookDates.rows})
   
    
 
    
    
    
   return res.json(FinalData)
  


}


var getPropsByUserId=async(req,res)=>{
    const data=await connection_MySQL.query(`SELECT * FROM property where iduser ='${req.params.idUser}' and availability!='deleted' ;`)
    if(!data.rows[0]) return res.json({message:'no data'})
    let FinalData=[]
    for(var i =0;i<data.rows.length;i++) {
        const PropAVG=await getPropAVG(data.rows[i].idproperty)
        const pics= await getPropPics(data.rows[0].idproperty)
         FinalData.push({...data.rows[0],avg:+PropAVG,picture:(pics)})
       
    
       }
   return res.json(FinalData)
  


}




var addApartment=async(req,res)=>{


if(!req.params.idUser) return res.status(400).json({"message":"idUser missing"})




var idApp=require('crypto').randomBytes(10).toString('hex').toUpperCase()
if(!HouseCategories.includes(req.body.HouseType)) return res.status(402).json({message:`HouseType should be in ${HouseCategories.join('/')}` })


await   connection_MySQL.query(`insert into property (idproperty,iduser,title,description,Address,Wilaya,price,category,BedsNumber,parking_spot,wifi,availability) 
values ('${idApp}','${req.params.idUser}','${req.body.title || "no title"}','${req.body.Description || "no description"}','${req.body.Address}','${+req.body.Wilaya}',
'${req.body.Amount || "0$"}','${req.body.HouseType }','${+req.body.BedsNumber || 1}','${req.body.parkingSpot || 'no'}'
,'${req.body.wifi || 'no'}','available');`)

await connection_MySQL
.query(`INSERT INTO picture(pic_url, idproperty) VALUES ('${req.body.picture}','${idApp}' );`)

return res.status(201).json({message:'done'})















    
}


var editApartment=async(req,res)=>{
var updates=[]
    if(!req.params.idProperty ) return res.status(402).json({message:'idProperty missing'})
    const oldProp=await connection_MySQL.query(`select * from property where idproperty='${req.params.idProperty}'`)
   if(!oldProp.rows[0]) return res.status(400).json({message:"idProperty does not exist"})
    if(req.body.newCategory) {
         if(!HouseCategories.includes(req.body.newCategory)) 
           return res.status(402).json({message:`HouseType should be in ${HouseCategories.join('/')}` })

         await connection_MySQL.query(`update property set category ='${req.body.newCategory}'
          where idproperty='${req.params.idProperty}'`)
           updates.push('houseCategory updated')
    }

   if(req.body.newTitle) {
    await connection_MySQL.query(`update property set title ='${req.body.newTitle}'
    where idproperty='${req.params.idProperty}'`)
     updates.push('title updated')
   }

   if(req.body.newDescription) {
    await connection_MySQL.query(`update property set description ='${req.body.newDescription}'
    where idproperty='${req.params.idProperty}'`)
     updates.push('Description updated')
   }
   if(req.body.newPicture) {
    await connection_MySQL.query(`update picture set pic_url ='${req.body.newPicture}'
    where idproperty='${req.params.idProperty}'`)
     updates.push('picture updated')
   }
   if(req.body.newAddress) {
    await connection_MySQL.query(`update property set address ='${req.body.newAddress}'
    where idproperty='${req.params.idProperty}'`)
     updates.push('address updated')
   }
   if(req.body.newAmount) {
    await connection_MySQL.query(`update property set price ='${req.body.newAmount}'
    where idproperty='${req.params.idProperty}'`)
     updates.push('Amount updated')
   }
   if(req.body.newWilaya) {
    await connection_MySQL.query(`update property set wilaya ='${+req.body.newWilaya}'
    where idproperty='${req.params.idProperty}'`)
     updates.push('Wilaya updated')
   }
   if(req.body.newBedsNumber) {
    await connection_MySQL.query(`update property set BedsNumber ='${req.body.newBedsNumber}'
    where idproperty='${req.params.idProperty}'`)
     updates.push('BedsNumber updated')
   }

   if(req.body.hasWifi) {
    await connection_MySQL.query(`update property set wifi ='${req.body.hasWifi}'
    where idproperty='${req.params.idProperty}'`)
     updates.push('wifi updated')
   }
   if(req.body.hasParkingSpot) {
    await connection_MySQL.query(`update property set parking_spot ='${req.body.hasParkingSpot}'
    where idproperty='${req.params.idProperty}'`)
     updates.push('hasParkingSpot updated')
   }




   const newProp=await connection_MySQL.query(`select * from property where idproperty='${req.params.idProperty}'`)
   const newPic=await connection_MySQL.query(`select pic_url from picture where idproperty='${req.params.idProperty}'`)
    var updatesToString=updates.join('/')
    const PropAvg=await getPropAVG(req.params.idProperty)
   return res.status(200).json({message:updatesToString,newProp:{...newProp.rows[0],avg:PropAvg,picture:newPic.rows[0]["pic_url"]}})
 
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        
    }
var deleteProp=async(req,res)=>{
    if(!req.params.idProperty ) return res.status(402).json({message:'idProperty missing'})
    await connection_MySQL.query(`update property set availability='deleted'  WHERE idproperty='${req.params.idProperty}' `)
   return res.sendStatus(200)
}
module.exports={addApartment,getPropsById,getPropsByUserId,editApartment,deleteProp}