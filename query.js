const express = require('express');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');

var url = "mongodb://localhost:27017/cuts";
    app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var schema = new mongoose.Schema({
    phone: String,
    otp: String});
  var Users = mongoose.model('usersotp', schema);
app.post('/verify', function(request, response) {
    var phone=request.body.phone;

    Users.findOne({"phone":phone}).exec(function(err, user) {

        if(err) {
            console.error('No DB connected');
        }
        
        console.log(user.otp);
    });

    response.send('Executed');
});

app.listen(3000, ()=>console.log('express server has been started at port 3000'));
