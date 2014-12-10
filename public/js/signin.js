var Users = require('./Users');

var signin  = function callback (jsonBroIn, _callback) { 

  console.log(jsonBroIn);
  var userName = jsonBroIn.userName;
  var passWord = jsonBroIn.passWord;

 console.log("Validating User")

  var internal_error = {'status':'Failure'};
  var jsonBro = JSON.stringify(internal_error);

    //var Schema = mongoose.Schema;

    //var userSchema = new Schema({
    //  userName:  String,
    //  passWord: String,
    //  emailAddress:   String,
    //});

/*    Users.find().distinct('userName', function(error, ids) {
      // ids is an array of all ObjectIds
      console.log("Found the following Users");
      console.log(ids);
    });
*/

    var err = null;
    Users.findOne({ 'userName': userName , 'passWord': passWord }, function (err, users) {
      if (users == null) {
        //got nothing for ya
        console.log('NOT FOUND');
        var rejected = {'status':'Invalid'};
        jsonBro = JSON.stringify(rejected);
        err = 'invalid';
        _callback(err, jsonBro);
      }
      else {
        //found send it off
        console.log('Found');
        var success = {'status':'Success'};
        //console.log(users.userName, users.passWord, users.emailAddress)
        jsonBro = JSON.stringify(users);
        console.log(jsonBro);
        _callback(err, jsonBro);
      }
    })

};

module.exports.signin = signin;

