let express=require('express')
const { getMCs } = require('../../controllers/rentsControllers/getMyClients')
const { bookProperty } = require('../../controllers/rentsControllers/bookProperty')
const { getOwnerRequests, approveRequest, rejectRequest, getClientRequests, cancelRequest } = require('../../controllers/rentsControllers/Requests')
const { reviewRent, rateClient } = require('../../controllers/rentsControllers/rates')


let app=express.Router()
app.route('/rate/rateRent/').post(reviewRent)
app.route('/rate/rateClient/').post(rateClient)
app.route('/getMyClients/nonRated/:idUser').get(getMCs)
app.route('/book/sendRequest').post(bookProperty)
app.route('/Requests/Owner/:idOwner').get(getOwnerRequests)
app.route('/Requests/approveRequest/:idRent').post(approveRequest)
app.route('/Requests/Client/:idClient').get(getClientRequests)
app.route('/Requests/rejectRequest/:idRent').post(rejectRequest)
app.route('/Requests/cancelRequestByClient/:idRent').post(cancelRequest)
module.exports=app