

var delete_question  = function callback (jsonBroIn, _callback) {

  console.log("deleting question")
  //var jsonCast = JSON.parse(jsonBroIn);
  //var parsedID = jsonCast.id;

  var parsedID = jsonBroIn._id;
  
  var messageDB = require('./Messages');


  //messageDB.find({_id:parsedID }).remove().exec();

messageDB.remove({ _id: parsedID }, function(err) {
    if (!err) {
           console.log("DELETED QUESTION")
            var success = {'status':'Success'}
        	var jsonBro = JSON.stringify(success);
        	console.log(jsonBro);
        	//mongoose.connection.close();
        	_callback(jsonBro);

    }
    else {
           console.log("UNABLE TO DELETE QUESION")
            console.log('NOT FOUND')
      		//return handleError(err)
      		var rejected = {'status':'Failure'};
      		var jsonBro = JSON.stringify(rejected)
     		 //mongoose.connection.close()
     		 _callback(jsonBro);
    }
});


}

module.exports.delete_question = delete_question;
