const connection_MySQL=require('../../MySql/connect')
let {format}=require('date-fns')


var addApartment=async(req,res)=>{


if(!req.params.idUser) return res.status(400).json({"message":"idUser missing"})
var HouseCategories=['Dortoir','Bungalow','villa','apartment']



var idApp=require('crypto').randomBytes(10).toString('hex').toUpperCase()
if(!HouseCategories.includes(req.body.HouseType)) return res.status(402).json({message:`HouseType should be in ${HouseCategories.join('/')}` })


await   connection_MySQL.query(`insert into apartment (idapartment,iduser,title,description,Address,Wilaya,price,category,BedsNumber,posteddate) 
values ('${idApp}','${req.params.idUser}','${req.body.title || "no title"}','${req.body.Description || "no description"}','${req.body.Address}','${+req.body.Wilaya}',
'${req.body.Amount || "0$"}','${req.body.HouseType }','${+req.body.BedsNumber || 1}','${format(new Date(),'yyyy-MM-dd  HH:mm:ss')}')`)

await connection_MySQL
.query(`INSERT INTO picture(pic_url, idapartment) VALUES ('${req.body.picture}','${idApp}' );`)

return res.status(201).json({message:'done'})















    
}
module.exports={addApartment}