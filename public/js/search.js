
var search  = function callback (jsonBroIn, _callback) {

  console.log(jsonBroIn);
  
  var parsedToken = jsonBroIn.searchValue;
  //parsedToken = 'cool'
  console.log("Parsed:",parsedToken);

  var internal_error = {'status':'Failure'};
  var jsonBro = JSON.stringify(internal_error);

  var messageDB = require('./Messages');

  var input = parsedToken;  // the input from your auto-complete box
    messageDB.find({messageBody: new RegExp(input, "i"), messageType: 'Question'}, function callback (err, docs) {
        jsonBro = JSON.stringify(docs);
        //console.log(jsonBro);
        _callback(jsonBro);
    });
};

module.exports.search = search;
