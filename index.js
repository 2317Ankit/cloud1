var http = require("http");
var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "feedback" 
});

app.get('/', (req, res) => {

      var choice = "<html>"
      choice += "<head>"
      choice += "<style>"
      choice += "body { font-family: 'Arial', sans-serif; background-color: lightblue; text-align: center;}"
      choice += "h1 { color: rgb(46, 43, 43); }"
      choice += "h2 { color: rgb(82, 79, 79); }"
      choice += "p { color: rgb(108, 99, 99); }"
      choice += "a { color: rgb(9, 52, 246); text-decoration: none; }"
      choice += "</style>"
      choice += "</head>"
      choice += "<body>"
      choice += "<h2>Feedback application</h2>"
      choice += "<h1>Welcome <h1>"
      choice += "<h3>Choose from the following</h3>"
      choice += "<a href='/user'>Create posts</a><br><br>"
      choice += "<a href='/viewposts'>View posts</a><br><br>"
      choice += "<a href='/viewallposts'>All posts</a><br><br>"
      choice += "</body>"
      choice += "</html>"
      res.send(choice);
  })

  
app.get('/user', (req, res) => {
    var userLoginForm = "<html>"
    userLoginForm += "<head>"
    userLoginForm += "<style>"
    userLoginForm += "body { font-family: 'Arial', sans-serif; background-color: #f0f0f0; text-align: center; }"
    userLoginForm += "h1 { color: rgb(46, 43, 43); }"
    userLoginForm += "form { display: inline-block; text-align: left; padding: 20px; background-color: #fff; }"
    userLoginForm += "label { margin-bottom: 10px; }"
    userLoginForm += "input[type='number'], input[type='text'], input[type='text'] { width: 100%; padding: 8px; margin-bottom: 15px; }"
    userLoginForm += "input[type='submit'] { background-color: rgb(9, 52, 246); color: #fff; padding: 10px 15px; border: none; cursor: pointer; }"
    userLoginForm += "</style>"
    userLoginForm += "</head>"
    userLoginForm += "<body>"
    userLoginForm += "<h1>User Login</h1>"
    userLoginForm += "<form method='post' action='/user/login'>"
    userLoginForm += "<label for='user_id'>User_id: </label>"
    userLoginForm += "<input type='number' id='user_id' name='user_id' required><br><br>"
    userLoginForm += "<label for='username'>Username: </label>"
    userLoginForm += "<input type='text' id='username' name='username' required><br><br>"
    userLoginForm += "<label for='email'>Email:  </label>"
    userLoginForm += "<input type='text' id='email' name='email' required><br><br>"
    userLoginForm += "<input type='submit' value='Login'>"
    userLoginForm += "</form>"
    userLoginForm += "</body>"
    userLoginForm += "</html>"
    res.send(userLoginForm);
  });

  app.post('/user/login',urlencodedParser, function(req, res){
    var user_id = req.body.user_id
    var username = req.body.username;
    var email = req.body.email;
    var checkReader="SELECT * FROM users WHERE user_id = ? AND username = ? AND email = ?";
    con.query(checkReader, [user_id, username, email], (err,result) => {
      if(result.length==0)
      {
        res.write("Inavalid User_id or Username or Email. Please try again.");
        res.end();
      }
      else{
        var user = "<html>"
        user += "<head>"
        user += "<style>"
        user += "body {text-align: center; background-color: #f0f0f0;}"
        user += "</style>"
        user += "</head>"
        user += "<body>"
        user += "<h1>Welcome </h1>"
        user += "<p>Add posts</p>"
        user += "<a href='/addPosts'>Add Posts</a><br>"
        user += "<p>Add comments</p>"
        user += "<a href='/addComments'>Add Comments</a><br>"
        user += "<p>View posts</p>"
        user += "<a href='/viewPosts'>View Posts</a><br>"     
        user += "</body>"
        user += "</html>"
  
        res.send(user);
      }
    })
  
  })

  
app.get('/addPosts', function (req, res) {
    var formHTML = "<html>";
    formHTML += "<body>";
    formHTML += "<form method='post' action='/addPostsHandler'>";
    formHTML += "Post_Id: <input type='int' name='post_id' required><br><br>";
    formHTML += "Title: <input type='text' name='title' required><br><br>";
    formHTML += "Content: <input type='text' name='content' required><br><br>";
    formHTML += "User_Id: <input type='number' name='user_id' required><br><br>";
    formHTML += "Created_at: <input type='text' name='created_at' required><br><br>";
    formHTML += "Rating: <input type='int' name='rating' required><br><br>";
    formHTML += "<input type='submit' value='Add Posts'>";
    formHTML += "</form>";
    formHTML += "</body>";
    formHTML += "</html>";
  
    res.send(formHTML);
  });
  
  app.post('/addPostsHandler', urlencodedParser, function (req, res) {
    var post_id = req.body.post_id;
    var title = req.body.title;
    var content = req.body.content;
    var user_id = req.body.user_id;
    var created_at = req.body.created_at;
    var rating = req.body.rating;
  
    var addPostQuery = "INSERT INTO posts (post_id, title, content, user_id, created_at, rating) VALUES (?, ?, ?, ?, ?, ?)";
    con.query(addPostQuery, [post_id, title, content, user_id, created_at, rating], function (err, result) {
      if (err) {
        res.status(500).send("Error adding posts: " + err.message);
      } else {
        res.send("Posts added successfully");
      }
    });
  });


   
app.get('/addComments', function (req, res) {
    var formHTMLs = "<html>";
    formHTMLs += "<body>";
    formHTMLs += "<form method='post' action='/addCommentsHandler'>";
    formHTMLs += "Comment_Id: <input type='int' name='comment_id' required><br><br>";
    formHTMLs += "Post_Id: <input type='number' name='post_id' required><br><br>";
    formHTMLs += "User_Id: <input type='number' name='user_id' required><br><br>";
    formHTMLs += "Comment_text: <input type='text' name='comment_text' required><br><br>";
    formHTMLs += "Rating: <input type='number' name='rating' required><br><br>";
    formHTMLs += "<input type='submit' value='Add Comments'>";
    formHTMLs += "</form>";
    formHTMLs += "</body>";
    formHTMLs += "</html>";
  
    res.send(formHTMLs);
  });
  
  app.post('/addCommentsHandler', urlencodedParser, function (req, res) {
    var comment_id = req.body.comment_id;
    var post_id = req.body.post_id;
    var user_id = req.body.user_id;
    var comment_text = req.body.comment_text;
    var rating = req.body.rating;
  
    var addCommentQuery = "INSERT INTO comments (comment_id, post_id, user_id, comment_text, rating) VALUES (?, ?, ?, ?, ?)";
    con.query(addCommentQuery, [comment_id, post_id, user_id, comment_text, rating], function (err, result) {
      if (err) {
        res.status(500).send("Error adding posts: " + err.message);
      } else {
        res.send("Comments added successfully");
      }
    });
  });
  
  app.get('/viewposts', (req, res) => {
    const sql = `
      SELECT *
      FROM posts
      ORDER BY post_id DESC`;
  
    con.query(sql, (err, results) => {
      if (err) {
        console.error('Error retrieving posts:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(results);
      }
    });
  });
  

  /*
// Route for retrieving the latest 3 blog posts with usernames
app.get('/latestPosts', (req, res) => {
    const sql = `
      SELECT posts.post_id, posts.title, posts.content, posts.created_at, posts.rating, users.username
      FROM posts
      INNER JOIN users ON posts.user_id = users.user_id
      ORDER BY posts.created_at DESC
      LIMIT 3;
    `;
    con.query(sql, (err, results) => {
      if (err) {
        console.error('Error retrieving latest posts:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(results);
      }
    });
  });
  */
  // Route for retrieving all positive comments for a specific post with usernames
  app.get('/positiveComments/:post_id', (req, res) => {
    const post_id = req.params.post_id;
    const sql = `
      SELECT comments.comment_id, comments.comment_text, users.username
      FROM comments
      INNER JOIN users ON comments.user_id = users.user_id
      WHERE comments.post_id = ? AND comments.rating > 0;
    `;
    con.query(sql, [post_id], (err, results) => {
      if (err) {
        console.error('Error retrieving positive comments:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(results);
      }
    });
  });
  

  //Delete post
app.get("/deleteComment/:comment_id", (req, res) => {
    let sql = `DELETE FROM comments WHERE comment_id=${req.params.comment_id}`;
    let query = con.query(sql, (err, result) => {
      if (err) throw err;
      console.log("result");
      res.send("Comment deleted");
    });
  });


  app.listen(3000, function () {
    console.log('Server is running on port 3000');
  });
  