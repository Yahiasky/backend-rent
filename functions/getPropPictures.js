const connection_MySQL=require('../MySql/connect')
var getPropPics=async(idProp)=>{
    let pics= await connection_MySQL.query(`select pic_url from picture
    where idproperty='${idProp}'`)
pics=pics.rows.map(e=>e['pic_url'])
return pics
}
module.exports=getPropPics