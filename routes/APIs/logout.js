let express=require('express')
let app=express.Router()
const Logout=require('../../controllers/logout')
app.route('/:idUser').get(Logout)
module.exports=app