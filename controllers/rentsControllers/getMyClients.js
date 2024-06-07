const connection=require('../../Database/connect')

const getPropAVG = require('../../functions/getPropAVG')



var getMCs=async(req,res)=>{
  
    if(!req.params.idUser) return res.status(400).json({"message":"idUser missing"})

    var userProps=await connection.query(`select idproperty from property where idUser='${req.params.idUser}'`)
   
    var userRents=[]
    for(var i =0;i<userProps.rows.length;i++) {
        const rentsForOneApp=await connection.query(`select * from rent
                                                 where idproperty='${userProps.rows[i].idproperty}' and status='approved' `)
                                               
        rentsForOneApp.rows.map(e=>userRents.push(e))
    
       }
     

    var userRentsFullData=[]
    for(var i =0;i<userRents.length;i++) {
        const rentRated=await connection.query(`select * from rateclient where idrent='${userRents[i].idrent}'`)
        
        if(rentRated.rows[0] || (new Date(userRents[i].enddate))>(new Date())) continue
  
           const ClientData=await connection.query(`select username,profilepictureurl,contact,rateasclient as clientRate from "User"
                                                    where iduser='${userRents[i].iduser}'`)
          
           const PropsData=await connection.query(`select title,description,picture from property
                                                    where idproperty='${userRents[i].idproperty}'`)
           const PropAVG=await getPropAVG(userRents[i].idproperty)
           
                                        
        userRentsFullData.push({
            idRent:userRents[i].idrent,
            rentDate:userRents[i].rentdate,
            enddate:userRents[i].enddate,
            price:userRents[i].price,
            ...(ClientData.rows[0]),
            ...(PropsData.rows[0]),
            PropAVG:PropAVG,
           })
       
          }
              
          
    

    
     return res.json(userRentsFullData)

}
module.exports={getMCs}