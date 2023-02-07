var mysql      = require('mysql2');
var connection = mysql.createConnection({
  host     : process.env.MYSQL_HOST,
  user     : process.env.MYSQL_USER,
  password : process.env.MYSQL_PASSWORD,
  database : process.env.MYSQL_DATABASE,
  dateStrings:  true,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("DB Connected!");
});

module.exports = connection;