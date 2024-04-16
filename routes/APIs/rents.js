let express=require('express')
const { getMCs } = require('../../controllers/rentsControllers/getMyClients')


let app=express.Router()

app.route('/getMyClients/nonRated/:idUser').get(getMCs)
module.exports=app