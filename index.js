// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// function validate(date){
//   const pattern1 =/^\d{4}-\d{2}=\d{2}$/;
//   const pattern2=/^[0-9]+$/;
//   if(pattern1.test(date) || pattern2.test(date)){
//       console.log("valid date");
//   }else{
//     console.log(new Date('a2c'));
//   }
// }

// validate('abc');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?",function(req,res){

  let {date}=req.params;
  console.log(typeof date);
  const pattern2=/^[0-9]+$/;

  if(!date){

    res.send({
      "unix": new Date().getTime(),
      "utc": new Date().toUTCString()
    });

  }else{
    if(pattern2.test(date)){
      date=parseInt(date);
    }
   
    parsedate=new Date(date);
    console.log(parsedate);
    if(parsedate=="Invalid Date"){
      res.send({
      error: "Invalid Date"
    });
    }else{
     res.send({
      "unix":new Date(date).getTime(),
      "utc": new Date(date).toUTCString()
    });
  }
  }
  
 
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
