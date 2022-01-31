const mysql = require("mysql2");
const util = require('util');

const connection = mysql.createConnection({
  host: "localhost",  
  user: "root",
  password: "pass",
  database: "employees"
});

connection.query = util.promisify( connection.query );

connection.connect(function (err) {
  if (err) 
  throw err;
  
});

module.exports = connection;