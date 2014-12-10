 

var post_question  = function callback (jsonBroIn, _callback) { 

  var userName = jsonBroIn.userName;
  var tagTopics = jsonBroIn.tagTopics;
  var title = jsonBroIn.title;
  var messageBody = jsonBroIn.messageBody;

  console.log("Creating a New Post")
  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/Users/ryanhillary/Desktop/nodejs/userDB');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback () {
    // yay!
    console.log("Connected to usersDB Successfully")
  });

  var messageInput = require('./Messages');
  
  var newMessage = new messageInput({userName: userName, tagTopics: tagTopics, title: title, messageType: 'Question', messageBody: messageBody, associatedIds: [], voteNum: 1})

  console.log(newMessage)

  newMessage.save(function (err, data) {
  if (err) {
    console.log(err);
    var rejected = {'status':'Failure'};
    var jsonBro = JSON.stringify(rejected)
    mongoose.connection.close()
    _callback(jsonBro);
  } 
  else{
  console.log('Saved ', data );
  //console.log(data)
  //console.log("ID from recent addition: ")
  //console.log(data._id)

  var success = {'status':'Success'}
  //console.log(users.userName, users.passWord, users.emailAddress)
  var jsonBro = JSON.stringify(data)
  console.log(jsonBro);
  mongoose.connection.close();
  _callback(jsonBro);
  }
  });
};

module.exports.post_question = post_question;


