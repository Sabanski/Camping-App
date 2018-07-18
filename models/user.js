var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


var UserSchema = new mongoose.Schema({
    username: {type: String , unique: true , required: true},
    password: String,
    firstName: String,
    lastName: String,
    email: {type: String , unique: true , required: true},
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    avatar: {type: String , default: 'https://as2.ftcdn.net/jpg/01/17/95/91/500_F_117959178_mOp22kjhdhWdoSoePHPafN7GLUYyvFNY.jpg'},
    isAdmin: {type: Boolean , default: false}
});

UserSchema.plugin(passportLocalMongoose);
 
module.exports = mongoose.model("User", UserSchema);