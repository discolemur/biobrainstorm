
//Be sure to change the mongoose.connect path

function signin(jsonBroIn){

  console.log("Validating User")

  var jsonCast = JSON.stringify(jsonBroIn)
  var userName = jsonCast.userName
  var passWord = jsonCast.passWord


  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/Users/ryanhillary/Desktop/nodejs/userDB');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback () {
    // yay!
    //console.log("Connected to usersDB Successfully")
  });

  var Schema = mongoose.Schema;

  var userSchema = new Schema({
    userName:  String,
    passWord: String,
    emailAddress:   String,
  });

  var Users = mongoose.model('Users',userSchema)

  Users.findOne({ 'userName': userName , 'passWord': passWord }, function (err, users) { 
    if (users == null) {
      //got nothing for ya
      console.log('NOT FOUND')
      var rejected = {'status': 'Failure'};
      var jsonBro = JSON.stringify(rejected)
      mongoose.connection.close()
      return jsonBro
      //return handleError(err)
    }
    else {
      //found, send it off
      var jsonBro = JSON.stringify(users)
      mongoose.connection.close()
      return jsonBro
    }
  })

}
