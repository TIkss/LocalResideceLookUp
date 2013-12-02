var mongoose = require('mongoose');
var hash = require('../util/hash');


UserSchema = mongoose.Schema({
    firstName:  String,
    lastName:   String,
    email:      String,
    salt:       String,
    hash:       String,
    role:       String,
    gender:     String,
    birthday:   {type:String,default:""},
    address:    {type:String,default:""},
    description:{type:String,default:""},
    dateSign:   {type:Date,default: Date.now()},
    phone:      {type:String,default:""}
});


UserSchema.statics.signup = function(email, password,role,firstName,lastName, done){
    var User = this;
    hash(password, function(err, salt, hash){
        if(err) throw err;
        // if (err) return done(err);
        User.create({
            email : email,
            salt : salt,
            role: role,
            firstName: firstName,
            lastName: lastName,
            hash : hash
        }, function(err, user){
            if(err) throw err;
            // if (err) return done(err);
            done(null, user);
        });
    });
};

UserSchema.statics.save = function (firstName, lastName, email, phone, description, address, gender, birthday, done) {
    var User = this;
    User.update({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        description: description,
        address: address,
        gender: gender,
        birthday: birthday
    }, function (err, user) {
        if (err) throw err;
        // if (err) return done(err);
        done(null, user);
    });
};



UserSchema.statics.isValidUserPassword = function(email, password, done) {
    this.findOne({email : email}, function(err, user){
        // if(err) throw err;
        if(err) return done(err);
        if(!user) return done(null, false, { message : 'Incorrect email.' });
        hash(password, user.salt, function(err, hash){
            if(err) return done(err);
            if(hash == user.hash) return done(null, user);
            done(null, false, {
                message : 'Incorrect password'
            });
        });
    });
};

var User = mongoose.model("User", UserSchema);
module.exports = User;