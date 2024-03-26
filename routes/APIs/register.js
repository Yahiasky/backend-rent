let express=require('express')
let app=express.Router()


const  register = require('../../controllers/register')

app.route('/').post(register)
module.exports=app