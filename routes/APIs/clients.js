let express=require('express')
let app=express.Router()
const connection_MySQL=require('../../MySql/connect')

const { getClients,getClient,deleteClient} = require('../../controllers/clientsControllers/clients')
const { getClientByUsername, getBlockedClientByUsername } = require('../../controllers/clientsControllers/searchByUsername')
const { getClientByEmail, getBlockedClientByEmail } = require('../../controllers/clientsControllers/searchByEmail')
const { getClientByJoinedDate, getBlockedClientByJoinedDate } = require('../../controllers/clientsControllers/searchByJoinedDate')

const { getClientStatus } = require('../../controllers/clientsControllers/clientStatus')
const { blockClient } = require('../../controllers/clientsControllers/blockClient')
const { unblockClient } = require('../../controllers/clientsControllers/unblockClient')
const { getClientHistory } = require('../../controllers/clientsControllers/clientHistory')





app.route('/')
            .get(getClients)
           
app.route('/searchByUsername/:username')
            .get(getClientByUsername)
app.route('/searchByEmail/:email')
            .get(getClientByEmail)
app.route('/searchByJoinedDate/:joinedDate')
            .get(getClientByJoinedDate)




app.route('/:idUser')
            .get(getClient)
            .delete(deleteClient)
            

app.route('/clientStatus/:idUser').get(getClientStatus)
app.route('/blockClient/:idUser').post(blockClient)
app.route('/unblockClient/:idUser').post(unblockClient)

app.route('/clientHistory/:idUser').get(getClientHistory)







//*404
// app.all('*',(req,res)=>{
//     connection_MySQL.query(`INSERT INTO access (  URL, METHOD) VALUES ( '${req.url}','${req.method}' );`)
//     res.status(404)
//        .sendFile(path.join(__dirname,'..','..','views','404.html'))
//     connection_MySQL.query(`INSERT INTO error ( idErrType, errContent) VALUES ( '404','NOT FOUND ERROR AT users' );`)
// })
module.exports=app