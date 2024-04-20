const connection_MySQL=require('../../MySql/connect')
const getPropAVG = require('../../functions/getPropAVG')


var getPropsByWilaya=async(req,res)=>{
    const data=await connection_MySQL.query(`SELECT * FROM apartment where wilaya =${req.params.wilaya}  ;`)

    let FinalData=[]
    for(var i =0;i<data.rows.length;i++) {
        const bookDates=await connection_MySQL.query(`select rentdate as startDate , enddate as endDate 
        from rent where idapartment='${data.rows[i].idapartment}' and status='approved'; `)
        const PropAVG=await getPropAVG(data.rows[i].idapartment)
         const pics= await connection_MySQL.query(`select pic_url from picture
                                                  where idapartment='${data.rows[i].idapartment}'`)
         FinalData.push({...data.rows[0],avg:+PropAVG,picture:(pics.rows[0]['pic_url']),bookDates:bookDates.rows})
       
    
       }
   return FinalData==null ? res.sendStatus(204) :res.json(FinalData)
  


}
module.exports={getPropsByWilaya}