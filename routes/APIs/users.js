let express=require('express')
let app=express.Router()
const connection_MySQL=require('../../MySql/connect')
const { getUsers, getUser, deleteUser } = require('../../controllers/usersControllers/users')




app.route('/').get(getUsers)
app.route('/:idUser').get(getUser).delete(deleteUser)














module.exports=app