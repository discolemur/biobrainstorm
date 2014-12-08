

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
  var tagTopics = jsonCast.tagTopics
  var title = jsonCast.title
  var messageBody = jsonCast.messageBody

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
  
  var messageInput = mongoose.model('Messages',messageSchema)
  
  var newMessage = new messageInput({userName: userName, tagTopics: tagTopics, title: title, messageType: 'Question', messageBody: messageBody, associatedIds: [], voteNum: 1})

  console.log(newMessage)

  newMessage.save(function (err, data) {
  
  if (err) {
    var rejected = {'status':'Failure'};
    var jsonBro = JSON.stringify(rejected)
    mongoose.connection.close()
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
  //console.log(data)
  var success = {'status':'Success'}
  var JsonBro = JSON.stringify(success)
  console.log("ID from recent addition: ")//add to response
  console.log(data._id)
  mongoose.connection.close()
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
