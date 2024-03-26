let express=require('express')
let app=express.Router()
const updatePassword=require('../../controllers/updatePassword')
app.route('/').put(updatePassword)





module.exports=app