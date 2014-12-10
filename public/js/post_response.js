var post_response  = function callback (jsonBroIn, _callback) { 

  console.log("Creating a New Response")
  

  var parentID = jsonBroIn.parentID;
  var userName = jsonBroIn.userName;
  var messageBody = jsonBroIn.messageBody;



  var rejected = {'status':'Failure'};
  var jsonBro = JSON.stringify(rejected);

  var responseInput = require('./Messages');
  
  var newResponse = new responseInput({userName: userName, tagTopics: [], title: '', messageType: 'Response', messageBody: messageBody, associatedIds: parentID, voteNum: 1})

  var newChildID = ''

  newResponse.save(function (err, data) {
      if (err) {
        console.log(err);
        var rejected = {'status':'Failure'};
        jsonBro = JSON.stringify(rejected)
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
             jsonBro = JSON.stringify(rejected)
             _callback(jsonBro);
             //return res.send("contact create error: " + err);
          } 
          else {
             console.log(data);
             messageDB.findByIdAndUpdate(
             data._id,
             {$push: {"associatedIds": [newChildID]}},
             {upsert: true},
                function(err, model) {
                 console.log("SUCCESS")
                 //console.log(err);
                 //console.log(model)
                 var success = {'status':'Success'}
                 //console.log(users.userName, users.passWord, users.emailAddress)
                 jsonBro = JSON.stringify(model)
                 console.log(jsonBro);
                 _callback(jsonBro);
               }
             )
          }
        });

       }//get the ID
  });
 

};


module.exports.post_response = post_response;
