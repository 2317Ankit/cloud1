var mysql = require('mysql');
var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "feedback"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Database connected");


    var sql = "CREATE TABLE users (" +
        "user_id INT AUTO_INCREMENT PRIMARY KEY," +
        "username VARCHAR(30) NOT NULL," +
        "email VARCHAR(30) NOT NULL)";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Users Table created");
    });

    var sql1 = "CREATE TABLE posts (" +
        "post_id INT AUTO_INCREMENT PRIMARY KEY," +
        "title VARCHAR(30) NOT NULL," +
        "content VARCHAR(255) NOT NULL," +
        "user_id INT NOT NULL," +
        "created_at VARCHAR(30) NOT NULL," +
        "rating INT NOT NULL )";
    con.query(sql1, function (err, result) {
        if (err) throw err;
        console.log("Posts Table created");
    });

    var sql2 = "CREATE TABLE comments (" +
        "comment_id INT AUTO_INCREMENT PRIMARY KEY," +
        "post_id INT NOT NULL," +
        "user_id INT NOT NULL," +
        "comment_text VARCHAR(255) NOT NULL," +
        "rating INT NOT NULL )";
    con.query(sql2, function (err, result) {
        if (err) throw err;
        console.log("Comments Table created");
    });

    con.end();
});
