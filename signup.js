//Be sure to change the path of the mongoose.connect path

//function signup(jsonBroIn){


  var fs = require('fs')
  var jsonBroIn = ''
  fs.readFile('in.json','utf8', function (err, data) {
    if(err){
      console.log("ERROR")
    }
    else{
      console.log('FILE OPENED: ',data);
      jsonBroIn = data
      //return data;
      var jsonCast = JSON.parse(jsonBroIn)
  var userName = jsonCast.userName
  var passWord = jsonCast.passWord
  var emailAddress = jsonCast.emailAddress


  console.log("Adding New User")
  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/Users/ryanhillary/Desktop/nodejs/userDB');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback () {
    // yay!
    console.log("Connected to usersDB Successfully")

    var Schema = mongoose.Schema;

  var userSchema = new Schema({
    userName:  String,
    passWord: String,
    emailAddress:   String,
  });

  var Users = mongoose.model('Users',userSchema)
 //Should I be checking for duplcate users and returning an error if the user already exists?
  var defaultUser = new Users({userName: userName, passWord: passWord, emailAddress: emailAddress})
  console.log(defaultUser)

  defaultUser.save(function (err, data) {
  if (err){
      var rejected = {'status':'Failure'};
      var jsonBro = JSON.stringify(rejected)
      mongoose.connection.close()
      var fs = require('fs');
      fs.writeFile("out.json", jsonBro, function(err) {
      if(err) {
        console.log(err);
      } else {
        //console.log("The file was saved!");
     }
      });
  }
  else {
    console.log('Saved ', data );
      var itWorked = {'status':'Success'};
      var jsonBro = JSON.stringify(itWorked)
      console.log(jsonBro);
      mongoose.connection.close();
      var fs = require('fs');
      fs.writeFile("out.json", jsonBro, function(err) {
      if(err) {
        console.log(err);
      } else {
        //console.log("The file was saved!");
     }
      });
  }
  });

  });
    }
});



//}
