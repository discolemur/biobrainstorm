var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  userName: String,
  passWord: String,
  emailAddress: String
});

module.exports = mongoose.model('Users', userSchema); 
