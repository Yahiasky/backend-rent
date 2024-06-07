const connection=require('../../Database/connect')


var bookProperty=async(req,res)=>{
try {
if(!req.body.idClient)return res.status(400).json({message:"idClient missing"})
if(!req.body.idProperty)return res.status(400).json({message:"idProperty missing"})
const client=await connection.query(`select * from "User" where iduser='${req.body.idClient}'`)
if(!client.rows[0])return res.status(400).json({message:"Client does not exist"})
const property=await connection.query(`select * from property where idproperty='${req.body.idProperty}'`)
if(!property.rows[0]) return res.status(400).json({message:"Property does not exist"})
var idRent=require('crypto').randomBytes(10).toString('hex').toUpperCase()
console.log(property.rows[0].price)
var price=property.rows[0].price
const startDate=  new Date(req.body.startDate)
const endDate= new Date(req.body.endDate)
const propertyRents=await connection.query(`select * from rent where idproperty='${req.body.idProperty}' and status='approved'`)
var propertyRanted=false
propertyRents.rows.map(rent=>{

   
if( (new Date(rent.rentdate))<=startDate &&  (new Date(rent.enddate))>=startDate ) propertyRanted=true
if( (new Date(rent.rentdate))>startDate &&  (new Date(rent.enddate))<endDate ) propertyRanted=true
if( (new Date(rent.rentdate))<=endDate &&  (new Date(rent.enddate))>=endDate ) propertyRanted=true
})
if(propertyRanted) return res.status(400).json({message:"Property are not available in all  this period "})
await connection.query(`insert into request (idrequest,iduser,rentdate,enddate,idproperty,price) values(
    '${idRent}','${req.body.idClient}','${req.body.startDate}','${req.body.endDate}','${req.body.idProperty}','${price}'
);`)

return res.json({message:'request submitted'})}
catch(err){console.log(err)}
}
module.exports={bookProperty}
