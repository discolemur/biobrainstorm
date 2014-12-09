
  
//you will need to change the mongoose.connect path

var search  = function callback (jsonBroIn, _callback) {

  console.log(jsonBroIn);
  var jsonCast = JSON.parse(jsonBroIn);
  var parsedToken = jsonCast.searchValue;
  //parsedToken = 'cool'
  console.log("Parsed:",parsedToken);

  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/Users/ryanhillary/Desktop/nodejs/userDB');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  

  db.once('open', function callback () {
    // yay!
    console.log("Connected to usersDB Successfully")//not initializing in time

  });

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
  var jsonBro = 'Fail';
  messageDB.find({messageBody: new RegExp(input, "i"), messageType: 'Question'}, function callback (err, docs) {
      jsonBro = JSON.stringify(docs);
      //console.log(jsonBro);
      mongoose.connection.close();
      _callback(jsonBro);
      //return jsonBro; //This is what needs to be returned!!!! 
  });
  console.log(jsonBro);
  //_callback(jsonBro);
  //return jsonBro;//returned fail

};

module.exports.search = search;
