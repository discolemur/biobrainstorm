  
  var voting  = function callback (jsonBroIn, _callback) { 

  console.log("voting")

  //var jsonCast = JSON.parse(jsonBroIn);
  //var id = jsonCast.id;
  //var voteType = jsonCast.voteType;

  var id = jsonBroIn.id;
  var voteType = jsonBroIn.voteType;


  var rejected = {'status':'Failure'};
  var jsonBro = JSON.stringify(rejected)

    var messageDB = require('./Messages');

    messageDB.findOne({_id: id}, function(err, message){
    if (err) { 
      var rejected = {'status':'Failure'};
      jsonBro = JSON.stringify(rejected)
      _callback(jsonBro);
    }

    if(voteType == "Up"){
      message.voteNum += 1;
    }
    else if(voteType == "Down"){
      message.voteNum -= 1;
    }

    message.save(function(err,model) {
      if (err) { 
        jsonBro = JSON.stringify(rejected)
        _callback(jsonBro);
      }
      else{
        var success = {'status':'Success'}
        //console.log(users.userName, users.passWord, users.emailAddress)
        jsonBro = JSON.stringify(model)
        console.log(jsonBro);
        _callback(jsonBro);
      }
    });
  });
};

module.exports.voting = voting;
