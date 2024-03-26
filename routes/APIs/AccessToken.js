let express=require('express')
let app=express.Router()
const AccessToken=require('../../controllers/AccessToken')
app.route('/').get(AccessToken)
module.exports=app