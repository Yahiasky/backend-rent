const connection=require('../../Database/connect')
const getPropAVG = require('../../functions/getPropAVG')
const sortArrayByAttribute = require('../../functions/sortObjectsArray')
const switchNumbers = require('../../functions/switchNumbers')




var getRecommendation=async(req,res)=>{
  var maxData=req.body.maxData || 20
  var minData=req.body.minData || 0
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

      var CoFinalData=[]
      FinalData=sortArrayByAttribute(FinalData,"avg")
      if(minData>maxData) switchNumbers(minData,maxData)
      if(minData>=FinalData.length) minData=FinalData.length-1
      
      
       for(var i =minData;i<maxData;i++) {
        if(i>=FinalData.length) break
        CoFinalData.push(FinalData[i])
    
       }
   return !FinalData ? res.sendStatus(204) :res.json(CoFinalData)
  } catch (error) {
    console.log(error)
  }
   
  


}
module.exports={getRecommendation}