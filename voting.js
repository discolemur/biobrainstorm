
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
      var id = jsonCast.id
      var voteType = jsonCast.voteType

  console.log("voting")
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

  messageDB.findOne({_id: id}, function(err, message){
  if (err) { 
    return next(err)
  }

  if(voteType == "Up"){
  message.voteNum += 1;
  }
  else if(voteType == "Down"){
    message.voteNum -= 1;
  }

  message.save(function (err,data) {
    if (err) { 
     //save failure

     var rejected = {'status':'Failure'};
     var jsonBro = JSON.stringify(rejected)
     mongoose.connection.close()
     fs.writeFile("out.json", jsonBro, function (err) {
     if(err) {
        console.log(err);
     } else {
      //console.log("The file was saved!");
     }
      });
    }
    else {
      console.log("Saved: ",data)
      //save success
      console.log("SUCCESS")
        //console.log(err);
        var success = {'status':'Success'}
        var JsonBro = JSON.stringify(success)
        //console.log("ID from recent addition: ")//add to response
        //console.log(model._id)
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
  });
}

});
