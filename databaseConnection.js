var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/MongoDatabase";

MongoClient.connect(url, function(err, db){
    if(err) {
        throw err;
    }

    console.log('Hi Express, Welcome to MongoDB');

    db.close();
});
