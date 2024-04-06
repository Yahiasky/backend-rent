let express=require('express')
const { addApartment } = require('../../controllers/apartmentsControllers/apartments')

let app=express.Router()

app.route('/addApartment/:idUser').post(addApartment)
module.exports=app