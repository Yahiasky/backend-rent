const connection_MySQL=require('../../MySql/connect')
const getPropAVG = require('../../functions/getPropAVG')
const getPropPics = require('../../functions/getPropPictures')
const sendEmail = require('../../functions/sendEmail')


var getPropsByWilaya=async(req,res)=>{
    const data=await connection_MySQL.query(`SELECT * FROM property where wilaya =${req.params.wilaya}  ;`)

    let FinalData=[]
    for(var i =0;i<data.rows.length;i++) {
        const bookDates=await connection_MySQL.query(`select rentdate as startDate , enddate as endDate 
        from rent where idproperty='${data.rows[i].idproperty}' ; `)
        const PropAVG=await getPropAVG(data.rows[i].idproperty)
        let pics= await getPropPics(data.rows[i].idproperty)
         FinalData.push({...data.rows[0],avg:+PropAVG,picture:(pics),bookDates:bookDates.rows})
       
    
       }
    sendEmail('yahiakasmi19@gmail.com','test','test')
   return !FinalData ? res.sendStatus(204) :res.json(FinalData)
  


}
module.exports={getPropsByWilaya}