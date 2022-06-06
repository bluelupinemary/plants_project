const mysql = require('mysql2');

const dbConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "aiq_project",
  multipleStatements: true
});

dbConn.connect(function(error){
  if(error) throw error;
  console.log("database connected succesfully.")
})

module.exports = dbConn;