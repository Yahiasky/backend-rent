const connection=require('../Database/connect')
var getPropPics=async(idProp)=>{
    let pics= await connection.query(`select pic_url from picture
    where idproperty='${idProp}'`)
pics=pics.rows.map(e=>e['pic_url'])
return pics
}
module.exports=getPropPics