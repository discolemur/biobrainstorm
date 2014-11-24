console.log("Start")
//console.log(process.argv)
var testOption = '/signin'
var userName = 'Test2'
var passWord = 'Test2'

//attempt to make a handler, will be made into a function later:

//if(testOption.localeCompare('/signin') == 0){
if('/signin' == testOption) {
  console.log("Validating User")

  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/Users/ryanhillary/Desktop/nodejs/userDB');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback () {
    // yay!
    console.log("Connected to usersDB Successfully")
  });

  var Schema = mongoose.Schema;

  var userSchema = new Schema({
    userName:  String,
    passWord: String,
    emailAddress:   String,
  });

  var Users = mongoose.model('Users',userSchema)

  Users.find().distinct('userName', function(error, ids) {
    // ids is an array of all ObjectIds
    console.log("Found the following Users")
    console.log(ids)
  });

  Users.findOne({ 'userName': userName , 'passWord': passWord }, function (err, users) {
    if (users == null) {
      //got nothing for ya
      console.log('NOT FOUND')
      //return handleError(err)
    }
    else {
      //found send it off
      console.log('Found')
      console.log(users.userName, users.passWord, users.emailAddress)
      var jsonBro = JSON.stringify(users)
      console.log(jsonBro)
    }
  })
}
console.log("Outside of loop")



