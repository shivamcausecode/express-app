const express = require('express');
const path = require('path');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var url = "mongodb://localhost:27017/express";
const os = require('os');
    app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
console.log(path.join(__dirname, 'app/'));
app.use('/app', express.static(path.join(__dirname, 'app/')));

app.get('/', (request, response)=>{
    console.warn('\x1b[36m%s\x1b[0m','this is a warning');
    console.error(os.arch());
    
    MongoClient.connect(url, function(err, client){
        if(err) {
            throw err;
        }
        
        var db = client.db('express');
        
        var totalTenders;
        
        db.collection('user').find().toArray(function(err, result){
            if(err) {
                throw err;
            }
            
            console.log('Hi Express, Welcome to MongoDB');
            
            totalTenders = result.length;
            
            console.log("Total instances: " + totalTenders);
        });
    });
    
    response.sendfile('index.html', { root: __dirname} );
});

app.post('/save', function(request, response) {
    var query1 = request.body.var1;
    var query2 = request.body.var2;
    
    console.log(query1);
    console.log(query2);
    
    MongoClient.connect(url, function(err, client){
        if(err) {
            throw err;
        }
        
        var db = client.db('express');
        
        db.collection('user').insert(request.body);
        
        console.log('Successfuly saved the data.');
    });
});


app.post('/delete', function(request, response) {
    var query1 = request.body.var1;
    var query2 = request.body.var2;
    
    console.log(query1);
    console.log(query2);
    
    MongoClient.connect(url, function(err, client){
        if(err) {
            throw err;
        }
        
        var db = client.db('express');
        
        var deleteQuery = {"_id": request.body.id};
        
        db.collection('user').remove(deleteQuery);
        
        console.log('Successfuly deleted the data.');
    });
});

app.post('/show', function(request, response) {
    MongoClient.connect(url, function(err, client){
        if(err) {
            throw err;
        }
        
        var db = client.db('express');
        
        db.collection('user').find().toArray(function(err, result){
            if(err) {
                throw err;
            }
            
            response.send(result);
        });
        
        console.log('Users list is now visible on UI.');
    });
});

app.patch('/', function(request, response) {
    MongoClient.connect(url, function(err, client){
        if(err) {
            throw err;
        }
        
        var db = client.db('express');
        
        db.collection('user').save(request.body);
        
        console.log('User' + request.body._id + 'has been updated');
    }); 
});
console.log(app._router.stack);

function addTwoNumbers(x, y) {
    return x + y;
}
console.log(addTwoNumbers(5, 1));

app.listen(3000, ()=>console.log('express server has been started at port 3000'));
