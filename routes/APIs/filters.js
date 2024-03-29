let express=require('express')
const { getPropsByWilaya } = require('../../controllers/filtersControllers/getPropertiesByWilaya')
let app=express.Router()

app.route('/getPropsByWilaya').get(getPropsByWilaya)
module.exports=app