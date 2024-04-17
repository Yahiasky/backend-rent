const connection_MySQL=require('../../MySql/connect')
let {format}=require('date-fns')
var HouseCategories=['Dortoir','Bungalow','villa','apartment']


var getPropsById=async(req,res)=>{
    const data=await connection_MySQL.query(`SELECT * FROM apartment where idapartment ='${req.params.idProperty}' ;`)
    
    let FinalData=[]
  
      const bookDates=await connection_MySQL.query(`select rentdate as startDate , enddate as endDate 
        from rent where idapartment='${data.rows[0].idapartment}' and status='approved'; `)
        const PropAVG=await connection_MySQL.query(`select AVG(value) from rent,review 
                                                 where rent.idrent=review.idrent
                                                  and idapartment='${data.rows[0].idapartment}' and status='approved'`)
        const pics= await connection_MySQL.query(`select pic_url from picture
                                                  where idapartment='${data.rows[0].idapartment}'`)
         FinalData.push({...data.rows[0],avg:+PropAVG.rows[0].avg,picture:(pics.rows[0]['pic_url']),bookDates:bookDates.rows})
       
    
    
   return res.json(FinalData)
  


}


var getPropsByUserId=async(req,res)=>{
    const data=await connection_MySQL.query(`SELECT * FROM apartment where iduser ='${req.params.idUser}' ;`)
    
    let FinalData=[]
    for(var i =0;i<data.rows.length;i++) {
        const PropAVG=await connection_MySQL.query(`select AVG(value) from rent,review 
                                                 where rent.idrent=review.idrent
                                                  and idapartment='${data.rows[i].idapartment}' and status='approved'`)
        const pics= await connection_MySQL.query(`select pic_url from picture
                                                  where idapartment='${data.rows[i].idapartment}'`)
         FinalData.push({...data.rows[0],avg:+PropAVG.rows[0].avg,picture:(pics.rows[0]['pic_url'])})
       
    
       }
   return res.json(FinalData)
  


}




var addApartment=async(req,res)=>{


if(!req.params.idUser) return res.status(400).json({"message":"idUser missing"})




var idApp=require('crypto').randomBytes(10).toString('hex').toUpperCase()
if(!HouseCategories.includes(req.body.HouseType)) return res.status(402).json({message:`HouseType should be in ${HouseCategories.join('/')}` })


await   connection_MySQL.query(`insert into apartment (idapartment,iduser,title,description,Address,Wilaya,price,category,BedsNumber,posteddate,parking_spot,wifi) 
values ('${idApp}','${req.params.idUser}','${req.body.title || "no title"}','${req.body.Description || "no description"}','${req.body.Address}','${+req.body.Wilaya}',
'${req.body.Amount || "0$"}','${req.body.HouseType }','${+req.body.BedsNumber || 1}','${format(new Date(),'yyyy-MM-dd  HH:mm:ss')}' ,'${req.body.parkingSpot || 'no'}'
,'${req.body.wifi || 'no'}');`)

await connection_MySQL
.query(`INSERT INTO picture(pic_url, idapartment) VALUES ('${req.body.picture}','${idApp}' );`)

return res.status(201).json({message:'done'})















    
}


var editApartment=async(req,res)=>{
var updates=[]
    if(!req.params.idProperty ) return res.status(402).json({message:'idProperty missing'})
    const oldProp=await connection_MySQL.query(`select * from apartment where idapartment='${req.params.idProperty}'`)
   if(!oldProp.rows[0]) return res.status(400).json({message:"idProperty does not exist"})
    if(req.body.newCategory) {
         if(!HouseCategories.includes(req.body.newCategory)) 
           return res.status(402).json({message:`HouseType should be in ${HouseCategories.join('/')}` })

         await connection_MySQL.query(`update apartment set category ='${req.body.newCategory}'
          where idapartment='${req.params.idProperty}'`)
           updates.push('houseCategory updated')
    }

   if(req.body.newTitle) {
    await connection_MySQL.query(`update apartment set title ='${req.body.newTitle}'
    where idapartment='${req.params.idProperty}'`)
     updates.push('title updated')
   }

   if(req.body.newDescription) {
    await connection_MySQL.query(`update apartment set description ='${req.body.newDescription}'
    where idapartment='${req.params.idProperty}'`)
     updates.push('Description updated')
   }
   if(req.body.newAddress) {
    await connection_MySQL.query(`update apartment set address ='${req.body.newAddress}'
    where idapartment='${req.params.idProperty}'`)
     updates.push('address updated')
   }
   if(req.body.newAmount) {
    await connection_MySQL.query(`update apartment set price ='${req.body.newAmount}'
    where idapartment='${req.params.idProperty}'`)
     updates.push('Amount updated')
   }
   if(req.body.newWilaya) {
    await connection_MySQL.query(`update apartment set wilaya ='${req.body.newWilaya}'
    where idapartment='${req.params.idProperty}'`)
     updates.push('Wilaya updated')
   }
   if(req.body.newBedsNumber) {
    await connection_MySQL.query(`update apartment set BedsNumber ='${req.body.newBedsNumber}'
    where idapartment='${req.params.idProperty}'`)
     updates.push('BedsNumber updated')
   }

   if(req.body.hasWifi) {
    await connection_MySQL.query(`update apartment set wifi ='${req.body.hasWifi}'
    where idapartment='${req.params.idProperty}'`)
     updates.push('wifi updated')
   }
   if(req.body.hasParkingSpot) {
    await connection_MySQL.query(`update apartment set parking_spot ='${req.body.hasParkingSpot}'
    where idapartment='${req.params.idProperty}'`)
     updates.push('hasParkingSpot updated')
   }




   const newProp=await connection_MySQL.query(`select * from apartment where idapartment='${req.params.idProperty}'`)
   
    var updatesToString=updates.join('/')
    
   return res.status(200).json({message:updatesToString,newProp:newProp.rows[0]})
 
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        
    }
var deleteProp=async(req,res)=>{
    if(!req.params.idProperty ) return res.status(402).json({message:'idProperty missing'})
    await connection_MySQL.query(`delete   FROM  apartment  WHERE idapartment='${req.params.idProperty}' `)
   return res.sendStatus(200)
}
module.exports={addApartment,getPropsById,getPropsByUserId,editApartment,deleteProp}