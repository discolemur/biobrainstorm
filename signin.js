
//Be sure to change teh mongoose.connect path

//function signin(jsonBroIn){
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
      console.log("Validating User")


      var jsonCast = JSON.parse(jsonBroIn)
      var userName = jsonCast.userName
      var passWord = jsonCast.passWord

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

   Users.findOne({ 'userName': userName , 'passWord': passWord }, function (err, users) { 
    if (users == null) {
      //got nothing for ya
      console.log('NOT FOUND')
      var rejected = {'userName':'NULL'};
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
      //return handleError(err)
    }
    else {
      //found send it off
      var jsonBro = JSON.stringify(users)
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
    })
    });
}
});
