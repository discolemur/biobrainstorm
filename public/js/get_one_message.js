
var get_one_message  = function callback (jsonBroIn, _callback) {

  console.log("getting message")
  //var jsonCast = JSON.parse(jsonBroIn);
  //var id = jsonCast.id;

  var id = jsonBroIn;

  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/Users/ryanhillary/Desktop/nodejs/userDB');
  var db = mongoose.connection;
  var rejected = {'status':'Failure'};
  var jsonBro = JSON.stringify(rejected);
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback () {
      // yay!
      console.log("Connected to usersDB Successfully")

    var messageDB = require('./Messages');

    messageDB.findOne({ '_id': id}, function (err, gotMessage) {
      if (gotMessage == null) {
        //got nothing for ya
        console.log('NOT FOUND');
        //return handleError(err)
        var rejected = {'status':'Failure'};
        jsonBro = JSON.stringify(rejected);
        mongoose.connection.close();
      }
      else {
        //found send it off
        console.log('Found');
        var success = {'status':'Success'}
        jsonBro = JSON.stringify(gotMessage);
        console.log(jsonBro);
        mongoose.connection.close();
        //return JSON to middle ware
      }
    })
  });

  _callback(jsonBro);
};


module.exports.get_one_message = get_one_message;
