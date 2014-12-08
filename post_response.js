
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
      var parentID = jsonCast.parentID
      var userName = jsonCast.userName
      var messageBody = jsonCast.messageBody
      console.log("Creating a New Response")

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
    tagTopics: [String], 
    title: String, 
    messageType:   String,
    messageBody: String,
    associatedIds: Array,
    voteNum: Number
  });
  
  var responseInput = mongoose.model('Messages',messageSchema)
  
  var newResponse = new responseInput({userName: userName, tagTopics: [], title: '', messageType: 'Response', messageBody: messageBody, associatedIds: parentID, voteNum: 1})

  var newChildID = ''

  newResponse.save(function (err, data) {
  if (err) {
    var rejected = {'status':'Failure'};
    var jsonBro = JSON.stringify(rejected)
    fs.writeFile("out.json", jsonBro, function (err) {
      if(err) {
        console.log(err);
      } else {
        //console.log("The file was saved!");
     }
      });
  }
  else {
    console.log('Saved New Response ', data );
    newChildID = data._id
    console.log('GotID:',newChildID)

    var messageDB = mongoose.model('Messages',messageSchema)

    messageDB.findById(parentID, function (err, data) {
    if (err){
      console.log("NOT FOUND")
      var rejected = {'status':'Failure'};
      var jsonBro = JSON.stringify(rejected)
      fs.writeFile("out.json", jsonBro, function (err) {
      if(err) {
        console.log(err);
      } else {
        //console.log("The file was saved!");
      }
      });
    } 
    console.log("Add to parent: ", parentID)
    messageDB.findByIdAndUpdate(parentID,
      {$push: {"associatedIds": [newChildID]}},
      {upsert: true},
      function (err, model) {
        console.log("SUCCESS")
        //console.log(err);
        console.log(model)
        var success = {'status':'Success'}
        var JsonBro = JSON.stringify(success)
        console.log("ID from recent addition: ")//add to response
        console.log(model._id)
        mongoose.connection.close()
        fs.writeFile("out.json", jsonBro, function(err) {
        if(err) {
          console.log(err);
        } else {
          //console.log("The file was saved!");
        }
    });
    }
    )
});
  }//get the ID
  });
  });
}
});
