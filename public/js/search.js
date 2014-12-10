
  
//you will need to change the mongoose.connect path

var search  = function callback (jsonBroIn, _callback) {

  console.log(jsonBroIn);
  
  var parsedToken = jsonBroIn.searchValue;
  //parsedToken = 'cool'
  console.log("Parsed:",parsedToken);

  var mongoose = require('mongoose');
  mongoose.connect('mongodb://root@biobrainstorm.com:27017/root/biobrainstorm/DB/test2');
  var db = mongoose.connection;
  var internal_error = {'status':'Failure'};
  var jsonBro = JSON.stringify(internal_error);
  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', function callback () {
    // yay!
    console.log("Connected to usersDB Successfully")//not initializing in time


    var messageDB = require('./Messages');

    var input = parsedToken;  // the input from your auto-complete box
    messageDB.find({messageBody: new RegExp(input, "i"), messageType: 'Question'}, function callback (err, docs) {
        jsonBro = JSON.stringify(docs);
        //console.log(jsonBro);
        mongoose.connection.close();
    });
  });
  _callback(jsonBro);
};

module.exports.search = search;
