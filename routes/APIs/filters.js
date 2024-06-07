let express=require('express')
const { getPropsByWilaya } = require('../../controllers/filtersControllers/getPropertiesByWilaya')
const { getRecommendation } = require('../../controllers/filtersControllers/recommendation')
let app=express.Router()

app.route('/getPropsByWilaya/:wilaya').get(getPropsByWilaya)
app.route('/recommendation/:wilaya').get(getRecommendation)
module.exports=app