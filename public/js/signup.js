

var signup  = function callback (jsonBroIn, _callback) { 

  //var jsonCast = JSON.parse(jsonBroIn);
  var userName = jsonBroIn.userName;
  var passWord = jsonBroIn.passWord;
  var emailAddress = jsonBroIn.emailAddress;

  console.log("Adding New User")
  var mongoose = require('mongoose');
  mongoose.connect('mongodb://root@biobrainstorm.com:27017/root/biobrainstorm/DB/test2');
  var db = mongoose.connection;
  var failed = {'status':'Failure'};
  var jsonBro = JSON.stringify(failed);
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback () {
    // yay!
    console.log("Connected to usersDB Successfully")
  });

  //var Schema = mongoose.Schema;

  //var userSchema = new Schema({
  //  userName:  String,
  //  passWord: String,
  //  emailAddress:   String,
  //});

  //var Users = mongoose.model('Users',userSchema)
 var Users = require('./Users');
 
 //Should I be checking for duplcate users and returning an error if the user already exists?

  var defaultUser = new Users({userName: userName, passWord: passWord, emailAddress: emailAddress})
  console.log(defaultUser)

  defaultUser.save(function (err, data) {
  if (err) {
    console.log(err);
    var rejected = {'status':'Invalid'};
    jsonBro = JSON.stringify(rejected)
    mongoose.connection.close()
  }
  else {
  	 console.log('Saved ', data );
      var success = {'status':'Success'}
      //console.log(users.userName, users.passWord, users.emailAddress)
      jsonBro = JSON.stringify(data)
      console.log(jsonBro);
      mongoose.connection.close();
  }
  });
  _callback(jsonBro);

};


module.exports.signup = signup;
