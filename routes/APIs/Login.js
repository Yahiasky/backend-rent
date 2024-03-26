let express=require('express')
let app=express.Router()
const Login=require('../../controllers/Login')
app.route('/').post(Login)
module.exports=app