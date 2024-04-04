


require('dotenv').config()

const { Client } = require("pg");
const {DATABASE_URL}=require('./../data/info')
const connection = new Client(DATABASE_URL);

(async () => {
  await connection.connect();
  try {
    
    console.log('MySQL connected');
  } catch (err) {
    console.error("error executing query",err);
  }
})();




module.exports=connection