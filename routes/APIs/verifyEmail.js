let express=require('express')
let app=express.Router()


const  verifyEmail = require('../../controllers/verifyEmail')

app.route('/').post(verifyEmail)



module.exports=app