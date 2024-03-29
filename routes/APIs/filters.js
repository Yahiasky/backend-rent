let express=require('express')
const { getPropsByWilaya } = require('../../controllers/filtersControllers/getPropertiesByWilaya')
let app=express.Router()

app.route('/getPropsByWilaya/:wilaya').get(getPropsByWilaya)
module.exports=app