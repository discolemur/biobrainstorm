

var signin  = function callback (jsonBroIn, _callback) { 

  console.log(jsonBroIn);
  //var jsonCast = JSON.parse(jsonBroIn);
  var userName = jsonBroIn.userName;
  var passWord = jsonBroIn.passWord;
  //parsedToken = 'cool'

 console.log("Validating User")

  var mongoose = require('mongoose');
  mongoose.connect('mongodb://root@biobrainstorm.com:27017/root/biobrainstorm/DB/test2');
  var db = mongoose.connection;
  var internal_error = {'status':'Failure'};
  jsonBro = JSON.stringify(internal_error);
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback () {
      // yay!
      console.log("Connected to usersDB Successfully")

    //var Schema = mongoose.Schema;

    //var userSchema = new Schema({
    //  userName:  String,
    //  passWord: String,
    //  emailAddress:   String,
    //});

    //var Users = mongoose.model('Users',userSchema)
    var Users = require('./Users');

    Users.find().distinct('userName', function(error, ids) {
      // ids is an array of all ObjectIds
      console.log("Found the following Users");
      console.log(ids);
    });

    Users.findOne({ 'userName': userName , 'passWord': passWord }, function (err, users) {
      if (users == null) {
        //got nothing for ya
        console.log('NOT FOUND')
        var rejected = {'status':'Invalid'};
        jsonBro = JSON.stringify(rejected);
        mongoose.connection.close();
        //return handleError(err)
      }
      else {
        //found send it off
        console.log('Found');
        var success = {'status':'Success'};
        //console.log(users.userName, users.passWord, users.emailAddress)
        jsonBro = JSON.stringify(users);
        console.log(jsonBro);
        mongoose.connection.close();
      }
    })
  });
  _callback(jsonBro);

};

module.exports.signin = signin;
