const express = require('express');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var url = "mongodb://localhost:27017/MongoDatabase";
const os = require('os');
    app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (request, response)=>{
    response.send('Hello express.js');
    console.warn('\x1b[36m%s\x1b[0m','this is a warning');
    console.error(os.arch());

MongoClient.connect(url, function(err, db){
    if(err) {
        throw err;
    }

    console.log('Hi Express, Welcome to MongoDB');
});
});

app.post('/handle', function(request, response) {
    var query1 = request.body.var1;
    var query2 = request.body.var2;

    console.log(query1);
    console.log(query2);
});


function addTwoNumbers(x, y) {
    return x + y;
  }
  console.log(addTwoNumbers(5, 1));

app.listen(3000, ()=>console.log('express server has been started at port 3000'));
