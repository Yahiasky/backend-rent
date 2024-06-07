const connection=require('../../Database/connect')
const getPropAVG = require('../../functions/getPropAVG')
const sortArrayByAttribute = require('../../functions/sortObjectsArray')
const switchNumbers = require('../../functions/switchNumbers')




var getPropsByWilaya=async(req,res)=>{

  try {
    const data=await connection.query(`SELECT p.*,U.contact FROM property p,"User" U where U.iduser=p.iduser and
    p.wilaya =${req.params.wilaya} and p.availability='available' ;`)


    let FinalData=[]
    for(var i =0;i<data.rows.length;i++) {
        const bookDates=await connection.query(`select rentdate as startDate , enddate as endDate 
        from rent where idproperty='${data.rows[i].idproperty}' and status='approved' ; `)
        const PropAVG=await getPropAVG(data.rows[i].idproperty)
       
         FinalData.push({...data.rows[i],avg:+PropAVG,bookDates:bookDates.rows})
       
    
       }
       FinalData=sortArrayByAttribute(FinalData,"avg")
   return !FinalData ? res.sendStatus(204) :res.json(FinalData)
  } catch (error) {
    console.log(error)
  }
   
  


}
module.exports={getPropsByWilaya}