const express = require('express');
const path = require('path');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var morgan = require('morgan')
var ObjectId = require('mongodb').ObjectID;

var url = "mongodb://localhost:27017/productDetails";
const os = require('os');
    app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/app', express.static(path.join(__dirname, 'app/')));

app.get('/', (request, response)=>{
    console.log('Showing the index page...');

    response.sendFile('index.html', { root: __dirname} );
});

app.post('/save', function(request, response) {
    var name = request.body.name;
    var description = request.body.description;
    var price = request.body.price;
    var selectedCategoryId = request.body.category_id;

    if (!(name && description && price && selectedCategoryId)) {
        response.send({'message': 'Unable to create product.'});

        return;
    }
    
    MongoClient.connect(url, function(err, client) {
        if(err) {
            throw err;
        }
        
        var db = client.db('productDetails');
        
        db.collection('product').insert({
            name: name,
            description: description,
            price: price,
            selectedCategoryId: selectedCategoryId
        });
        
        console.log('Successfuly saved the data.');

        response.send({'message': 'Product was created.'});
    });
});

app.get('/readOneDocument/:id', function(request, response) {
    console.log('readOneDocument endpoint is hit to get the details of the product.');
    MongoClient.connect(url, function(err, client){
        if(err) {
            throw err;
        }
        
        var db = client.db('productDetails');

        var productQuery = {"_id": ObjectId(request.params.id)};
        
        db.collection('product').find(productQuery).toArray(function(err, result){
            if(err) {
                throw err;
            }

            if(result.length) {
                response.send(result[0]);        
            }
        });
        
        console.log('Product details for the id: ' + productQuery._id + ' is now visible on UI');
    });
});

app.post('/delete', function(request, response) {
    var productId = request.body.id;

    console.log('Delete endpoint is hit to delete the data with id: ' + productId);
    
    MongoClient.connect(url, function(err, client){
        if(err) {
            throw err;
        }
        
        var db = client.db('productDetails');
        
        var deleteQuery = {"_id": ObjectId(productId)};
        
        db.collection('product').remove(deleteQuery);
        
        console.log('Successfuly deleted the data of id: ' + productId);
    });

    response.send('Successfully deleted the record.');
});

app.get('/show', function(request, response) {
    MongoClient.connect(url, function(err, client){
        if(err) {
            throw err;
        }
        
        var db = client.db('productDetails');
        
        db.collection('product').find().toArray(function(err, result){
            if(err) {
                throw err;
            }
            
            response.send({records: result});
        });
        
        console.log('Product list is now visible on UI.');
    });
});

app.get('/category', function(request, response) {
    MongoClient.connect(url, function(err, client){
        if(err) {
            throw err;
        }
        
        var db = client.db('productDetails');
        
        db.collection('categories').find().toArray(function(err, result){
            if(err) {
                throw err;
            }
            
            response.send({records: result});
        });
        
        console.log('Categories are now visible in drop down.');
    });
});

app.patch('/', function(request, response) {
    console.log('Patch endpoint is hit to update the data');
    MongoClient.connect(url, function(err, client){
        if(err) {
            throw err;
        }
        
        var db = client.db('productDetails');

        var updateQuery = request.body;
        console.log(JSON.stringify(request.body));
        updateQuery._id = ObjectId(updateQuery.id);
        delete updateQuery.id; 
        
        db.collection('product').save(request.body);
        
        console.log('Product ' + updateQuery._id + ' has been updated');

        response.send({'message': 'Product was updated.'})
    });
});

function addTwoNumbers(x, y) {
    return x + y;
}

app.listen(3000, ()=>console.log('express server has been started at port 3000'));
