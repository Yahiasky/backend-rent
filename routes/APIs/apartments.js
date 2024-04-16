let express=require('express')
const { addApartment, getPropsById, getPropsByUserId, editApartment, deleteProp } = require('../../controllers/apartmentsControllers/apartments')

let app=express.Router()

app.route('/addApartment/:idUser').post(addApartment)
app.route('/getApartmentById/:idProperty').get(getPropsById)
app.route('/editApartment/:idProperty').put(editApartment)
app.route('/deleteApartment/:idProperty').delete(deleteProp)
app.route('/getApartmentsByUserId/:idUser').get(getPropsByUserId)
module.exports=app