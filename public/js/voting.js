  
  var voting  = function callback (jsonBroIn, _callback) { 

  console.log("voting")

  //var jsonCast = JSON.parse(jsonBroIn);
  //var id = jsonCast.id;
  //var voteType = jsonCast.voteType;

  var id = jsonBroIn.id;
  var voteType = jsonBroIn.voteType;


  var mongoose = require('mongoose');
  mongoose.connect('mongodb://root@biobrainstorm.com:27017/root/biobrainstorm/DB/test2');
  var db = mongoose.connection;
  var rejected = {'status':'Failure'};
  var jsonBro = JSON.stringify(rejected)
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback () {
    // yay!
    console.log("Connected to usersDB Successfully")

    var messageDB = require('./Messages');

    messageDB.findOne({_id: id}, function(err, message){
    if (err) { 
      var rejected = {'status':'Failure'};
      jsonBro = JSON.stringify(rejected)
      mongoose.connection.close()
    }

    if(voteType == "Up"){
      message.voteNum += 1;
    }
    else if(voteType == "Down"){
      message.voteNum -= 1;
    }

    message.save(function(err,model) {
      if (err) { 
        var rejected = {'status':'Failure'};
        jsonBro = JSON.stringify(rejected)
        mongoose.connection.close()
      }
      else{
        var success = {'status':'Success'}
        //console.log(users.userName, users.passWord, users.emailAddress)
        jsonBro = JSON.stringify(model)
        console.log(jsonBro);
        mongoose.connection.close();
      }
    });
  });
  });
  _callback(jsonBro);
};

module.exports.voting = voting;
