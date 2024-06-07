const connection=require('../Database/connect')
var getPropAVG=async(idProp)=>{

const PropAVG=await connection.query(`select AVG(value) from rent,review 
                                                    where rent.idrent=review.idrent and idproperty='${idProp}' and status='approved'
                                                    `)
return PropAVG.rows[0].avg
}
module.exports=getPropAVG
