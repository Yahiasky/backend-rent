const connection_MySQL=require('../../MySql/connect')
let {format}=require('date-fns')
const uuid=require('uuid')

var addApartment=async(req,res)=>{


if(req.params.idUser) return res.status(402).json({"message":"idUser missing"})
var HouseCategories=["Dortoir","Bungalow",""]

















    
}