const connection_MySQL=require('../MySql/connect')
var getPropAVG=async(idProp)=>{

const PropAVG=await connection_MySQL.query(`select AVG(value) from rent,review 
                                                    where rent.idrent=review.idrent and idproperty='${idProp}'
                                                    `)
return PropAVG.rows[0].avg
}
module.exports=getPropAVG
