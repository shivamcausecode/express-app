var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/spyder_dev";

MongoClient.connect(url, function(err, db){
    if(err) {
        throw err;
    }  
    
    

    console.log('Hi Express, Welcome to MongoDB');
});
