//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.listen(3000, function() {
  console.log("the server is running on port 3000");
});


app.get('/', function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post('/', function(req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  // console.log(firstName, lastName, email);

  var data = {
    members: [
      {
      email_address: email,
      status: "subscribed"
    }
  ]
  };
  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us20.api.mailchimp.com/3.0/lists/ed1f513cdf",
    method: "POST",
    headers: {
      "Authorization": "AbdelsalamMegahed 468285e0d16c461183c741411195accb-us20",
    },
     body: jsonData

  };
  request(options, function(error, response, body) {
    if (error) {
      // console.log(response.statusCode);
      res.sendFile(__dirname + "/failure.html" );
    } else {

      if(response.statusCode === 200){
        // console.log(response.statusCode);
        res.sendFile(__dirname + "/success.html" );
      }else{
        res.sendFile(__dirname + "/failure.html" );
      }
    }
  });

});
app.post('/failure',function(req, res){
  res.redirect('/');
});


// ed1f513cdf
//468285e0d16c461183c741411195accb-us20
