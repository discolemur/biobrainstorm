

var j = {"userName":"Ryan Hillary","passWord":"dude","emailAddress":"rphil@gmail.com"}
//var j = {"searchValue":"cool"}
var jsonBroIn = JSON.stringify(j);
console.log(jsonBroIn);

//var do_search  = function callback (jsonBroIn, _callback) {

//	var handler = require('./search2');

//	var handle_search = function(jsonBroOut) {
//		console.log("RETURNED!: ",jsonBroOut);
	//_callback(jsonBroOut);
//	};

//handler.search(jsonBroIn, handle_search);

//}
//module.exports.do_search = do_search;

//var do_signin = function callback (jsonBroIn, _callback){

//	var handler = require('./signin2');

//	var handle_signin = function(jsonBroOut) {
//		console.log("RETURNED!: ", jsonBroOut)
		//_callback(jsonBroOut);
//	}
	
	//hanlder.signin(jsonBroIn, handle_signin);
//}

//module.exports.do_signin = do_signin;

//var do_signup = function callback(jsonBroIn, _callback){

	var hanlder = require('./signup2');

	var handle_signup = function callback (jsonBroOut){
		console.log("RETURNED!: ",jsonBroOut);
		//_callback(jsonBroOut); 
	}

	hanlder.signup(jsonBroIn, handle_signup)

//}

//module.exports.do_signup = do_signup;


