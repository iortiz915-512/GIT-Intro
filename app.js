const express = require('express');
const parser = require('body-parser');
const https = require('https');
const request = require('request');

const app = express();
app.use(express.static("public"));

app.use(parser.urlencoded({
  extended: true
}));


app.get("/", function(req, res) {

res.sendFile(__dirname+ '/signup.html');

});

app.post("/", function(req, res) {


    const first = req.body.first;
    const last = req.body.last;
    const email = req.body.email;
    const https = require('https');

    var  data ={

        members: [
          {
            email_address:email,
            status: "subscribed",
            merge_fields: {

              FNAME: first,
              LNAME: last
            }
          }
        ]

    };

    const jsonData = JSON.stringify(data);
    const url = "https://us1.api.mailchimp.com/3.0/lists/730960b3fe";

    const options = {

      method: "POST",
      auth: "ismaO:1f18326e8402bfa981022e817ccabc40-us1"

    }

    const request = https.request(url,options, function(response){

    if(response.statusCode === 200){
      res.sendFile(__dirname + "/sucess.html")
    }
    else{

      res.sendFile(__dirname + "/failure.html")

    }

      response.on("data", function(data){
        console.log(JSON.parse(data));
      })
    })

request.write(jsonData);
request.end();




    //console.log(wd);
    console.log(first);
    console.log(last);
    console.log(email);


});

app.post("/failure", function(req,res){

  res.redirect("/");

})


app.listen(process.env.PORT || 3000, function() {

  console.log("server is running on port 3000");

});


// API KEY
// 1f18326e8402bfa981022e817ccabc40-us1


// unique ID
// 730960b3fe
