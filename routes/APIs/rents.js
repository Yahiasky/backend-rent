let express=require('express')
const { getMCs } = require('../../controllers/rentsControllers/getMyClients')
const { bookProperty } = require('../../controllers/rentsControllers/bookProperty')


let app=express.Router()

app.route('/getMyClients/nonRated/:idUser').get(getMCs)
app.route('/book/sendRequest').post(bookProperty)
module.exports=app