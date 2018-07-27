const express = require('express');
    app = express();

app.get('/', (request, response)=>{
    response.send('Hello express.js');
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

        console.log('User ' + request.body._id + ' has been updated');
    }); 
});

function addTwoNumbers(x, y) {
    return x + y;
  }
  console.log(addTwoNumbers(5, 1));

app.listen(3000, ()=>console.log('express server has been started at port 3000'));
