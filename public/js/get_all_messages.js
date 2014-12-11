var get_all_messages  = function callback (jsonBroIn, _callback) {

  console.log("getting question")
  //var jsonCast = JSON.parse(jsonBroIn);
  //var id = jsonCast.id;

  var messageDB = require('./Messages');

  messageDB.find({ 'messageType': 'Question'}, function (err, gotMessage) {
    if (gotMessage == null) {
      //got nothing for ya
      console.log('NOT FOUND')
      //return handleError(err)
      var rejected = {'status':'Failure'};
      var jsonBro = JSON.stringify(rejected)
      mongoose.connection.close()
      _callback(jsonBro);
    }
    else {
      //found send it off
      console.log('Questions Found')
        var success = {'status':'Success'}
        var jsonBro = JSON.stringify(gotMessage);
        console.log(jsonBro);
        mongoose.connection.close();
        _callback(jsonBro);
      //return JSON to middle ware
    }
  })

};


module.exports.get_all_messages = get_all_messages;
