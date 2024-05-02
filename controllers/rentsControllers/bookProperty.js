const connection_MySQL=require('../../MySql/connect')
let {format}=require('date-fns')

var bookProperty=async(req,res)=>{

if(!req.body.idClient)return res.status(400).json({message:"idClient missing"})
if(!req.body.idProperty)return res.status(400).json({message:"idProperty missing"})
const client=await connection_MySQL.query(`select * from "User" where iduser='${req.body.idClient}'`)
if(!client.rows[0])return res.status(400).json({message:"Client does not exist"})
const property=await connection_MySQL.query(`select * from property where idproperty='${req.body.idProperty}'`)
if(!property.rows[0]) return res.status(400).json({message:"Property does not exist"})
var idRent=require('crypto').randomBytes(10).toString('hex').toUpperCase()

const startDate=req.body.startDate || format(new Date(),'yyyy-MM-dd  HH:mm:ss')
const endDate=req.body.endDate || format(new Date()+1,'yyyy-MM-dd  HH:mm:ss')

await connection_MySQL.query(`insert into request (idrequest,iduser,rentdate,enddate,idproperty) values(
    '${idRent}','${req.body.idClient}','${startDate}','${endDate}','${req.body.idProperty}'
);`)

return res.json({message:'request submitted'})
}
module.exports={bookProperty}
