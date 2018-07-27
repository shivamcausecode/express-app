var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/express');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error with mongoDB'));

db.once('open', function() {
    
});

var userSchema = new mongoose.Schema({
    fName: String,
    lName: String
});

userSchema.methods.approve = function() {
    var message = this.fName ? "User is admin and his name is: " + this.fName : "I don't know the type of user";

    console.log(message);
}

var User = mongoose.model('User', userSchema);

var adminUser = new User({fName: 'Hardik', lName: 'Modha'});
adminUser.save(function(err, adminUser){
    if(err) {
        return console.error(err);
    }

    adminUser.approve();
});
