var post_response  = function callback (jsonBroIn, _callback) { 

  console.log("Creating a New Response")
  var jsonCast = JSON.parse(jsonBroIn);
  var parentID = jsonCast.parentID;
  var userName = jsonCast.userName;
  var messageBody = jsonCast.messageBody;
  

  //var parentID = jsonBroIn.parentID;
  //var userName = jsonBroIn.userName;
  //var messageBody = jsonBroIn.messageBody;



  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/Users/ryanhillary/Desktop/nodejs/userDB');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback () {
    // yay!
    console.log("Connected to usersDB Successfully")
  });

  var responseInput = require('./Messages');
  
  var newResponse = new responseInput({userName: userName, tagTopics: [], title: '', messageType: 'Response', messageBody: messageBody, associatedIds: parentID, voteNum: 1})

  var newChildID = ''

  newResponse.save(function (err, data) {
  if (err) {
    console.log(err);
    var rejected = {'status':'Failure'};
    var jsonBro = JSON.stringify(rejected)
    mongoose.connection.close()
    _callback(jsonBro);
  }
  else {
    console.log('Saved New Response ',data);
    newChildID = data._id
    console.log('GotID:',newChildID)
    
     console.log("ID out of Func: ",newChildID)
  var messageDB = require('./Messages');

  messageDB.findById(parentID, function (err, data) {
    if (err){
      console.log("NOT FOUND")
    var rejected = {'status':'Failure'};
    var jsonBro = JSON.stringify(rejected)
    mongoose.connection.close()
    _callback(jsonBro);
      //return res.send("contact create error: " + err);
    } 
    console.log(data)
    messageDB.findByIdAndUpdate(
    data._id,
    {$push: {"associatedIds": [newChildID]}},
    {upsert: true},
    function(err, model) {
        console.log("SUCCESS")
        //console.log(err);
        //console.log(model)
        //mongoose.connection.close()
        var success = {'status':'Success'}
        //console.log(users.userName, users.passWord, users.emailAddress)
        var jsonBro = JSON.stringify(model)
        console.log(jsonBro);
        mongoose.connection.close();
        _callback(jsonBro);
    }
    )
});

    }//get the ID
  });
 

};


module.exports.post_response = post_response;
