let express=require('express')
let app=express.Router()

const { getUsers, getUser, deleteUser } = require('../../controllers/usersControllers/users')
const { updateUser } = require('../../controllers/usersControllers/infoUpdate')





app.route('/').get(getUsers)
app.route('/:idUser').get(getUser).delete(deleteUser)

app.route('/updateUser/:idUser').put(updateUser)












module.exports=app