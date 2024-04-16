const connection_MySQL=require('../../MySql/connect')
let {format}=require('date-fns')


var getMCs=async(req,res)=>{
    if(!req.params.idUser) return res.status(400).json({"message":"idUser missing"})

    var userProps=await connection_MySQL.query(`select idApartment from apartment where idUser='${req.params.idUser}'`)
   
    var userRents=[]
    for(var i =0;i<userProps.rows.length;i++) {
        const rentsForOneApp=await connection_MySQL.query(`select * from rent
                                                 where idapartment='${userProps.rows[i].idapartment}' and status='approved'`)
                                               
        rentsForOneApp.rows.map(e=>userRents.push(e))
    
       }
     

    var userRentsFullData=[]
    for(var i =0;i<userRents.length;i++) {
        const rentRated=await connection_MySQL.query(`select * from rateclient where idrent='${userRents[i].idrent}'`)
        
        if(rentRated.rows[0] || (new Date(userRents[i].enddate))>(new Date())) continue
  
           const ClientData=await connection_MySQL.query(`select username,contact from "User"
                                                    where iduser='${userRents[i].iduser}'`)
           const clientRate=await connection_MySQL.query(`SELECT AVG(value) FROM rateClient,rent 
                                                    where rent.idUser ='${userRents[i].iduser}'
                                                     and rateClient.idRent=rent.idRent  and status='approved' ;`)
           const PropsData=await connection_MySQL.query(`select title,description from apartment
                                                    where idapartment='${userRents[i].idapartment}'`)
           const PropAVG=await connection_MySQL.query(`select AVG(value) from rent,review 
                                                    where rent.idrent=review.idrent and idapartment='${userRents[i].idapartment}'
                                                    and status='approved'`)
           const pics= await connection_MySQL.query(`select pic_url from picture
                                                    where idapartment='${userRents[i].idapartment}'`)
                                        
        userRentsFullData.push({
            idRent:userRents[i].idrent,
            rentDate:userRents[i].rentdate,
            enddate:userRents[i].enddate,
            price:userRents[i].price,
            ...(ClientData.rows[0]),
            clientRate:clientRate.rows[0].avg,
            ...(PropsData.rows[0]),
            PropAVG:PropAVG.rows[0].avg,
            picture:(pics.rows[0]['pic_url'])})
       
          }
              
          
    

    
     return res.json(userRentsFullData)

}
module.exports={getMCs}