


require('dotenv').config()

const { Client } = require("pg");
const {DATABASE_URL}=require('./../data/info');
const sendEmail = require('../functions/sendEmail');
const connection = new Client(DATABASE_URL);

(async () => {
 
  try {
     await connection.connect();
    console.log('MySQL connected');
  } catch (err) {
    sendEmail(process.env.EmailTo,'error connecting to database',`e ${err.message}`)
    console.error("error executing query",err);
  }
})();




module.exports=connection