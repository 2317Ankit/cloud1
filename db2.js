var mysql = require('mysql');
var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "feedback"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  var insertUserQuery = "INSERT INTO users (user_id, username, email) VALUES ?";
  var userValues = [
    ["1", "ankit", "ankit@gmail.com"],
    ["2", "aryan", "aryan@gmail.com"],
    ["3", "anant", "anant@gmail.com"],
    ["4", "shivan", "shivan@gmail.com"],
    ["5", "somil", "somil@gmail.com"],
  ];

  con.query(insertUserQuery, [userValues], function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " users inserted");
  });

  con.end();  
});
