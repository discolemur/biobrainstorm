

var delete_question  = function callback (jsonBroIn, _callback) {

  console.log("deleting question")
  //var jsonCast = JSON.parse(jsonBroIn);
  //var parsedID = jsonCast.id;

  var parsedID = jsonBroIn.id;


  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/Users/ryanhillary/Desktop/nodejs/userDB');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback () {
    // yay!
    console.log("Connected to usersDB Successfully")
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
  

  var messageDB = require('./Messages');


  messageDB.find({_id:parsedID }).remove().exec();

messageDB.remove({ _id: parsedID }, function(err) {
    if (!err) {
           console.log("DELETED QUESTION")
            var success = {'status':'Success'}
        	var jsonBro = JSON.stringify(success);
        	console.log(jsonBro);
        	mongoose.connection.close();
        	_callback(jsonBro);

    }
    else {
           console.log("UNABLE TO DELETE QUESION")
            console.log('NOT FOUND')
      		//return handleError(err)
      		var rejected = {'status':'Failure'};
      		var jsonBro = JSON.stringify(rejected)
     		 mongoose.connection.close()
     		 _callback(jsonBro);
    }
});


}

module.exports.delete_question = delete_question;
