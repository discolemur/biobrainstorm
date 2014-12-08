
  
//you will need to change the mongoose.connect path


var fs = require('fs')
var jsonBroIn = ''
fs.readFile('in.json','utf8', function (err, data) {
    if(err){
      console.log("ERROR")
    }
    else{
      console.log('FILE OPENED: ',data);
      jsonBroIn = data
      console.log("From Function: ", jsonBroIn)

  var jsonCast = JSON.parse(jsonBroIn);

  var parsedToken = jsonCast.searchValue;
  console.log("Parsed:",parsedToken);

  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/Users/ryanhillary/Desktop/nodejs/userDB');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  

  db.once('open', function callback () {
    // yay!
    console.log("Connected to usersDB Successfully")
      var Schema = mongoose.Schema;

  var messageSchema = new Schema({
    userName: String,
    tagTopics: [String], // possible method to find search results
    title: String, 
    messageType:   String,
    messageBody: String,
    associatedIds: Array,
    voteNum: Number
  });
  
  var messageDB = mongoose.model('Messages',messageSchema)


  var input = parsedToken;  // the input from your auto-complete box
  console.log(parsedToken)
  messageDB.find({messageBody: new RegExp(input, "i"),messageType: 'Question'}, function callback (err, docs) {
      jsonBro = JSON.stringify(docs);
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
  });
  });
  }
  });

 
