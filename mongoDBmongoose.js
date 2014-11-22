console.log("Start")
console.log(process.argv)
var sum = process.argv[2]
console.log(sum)
var fs = require('fs')
var fileStuff = fs.readFile('/Users/ryanhillary/Desktop/nodejs/stuff.txt',callback)
//var str = fileStuff.toString()
//console.log(str)
function callback (err,data) {
	//var moreStuff = fs.readFile('/Users/ryanhillary/Desktop/stuff.txt')
	var str= data.toString()
	console.log(str)
	console.log("success")
}

//connect to a mongo DB using mongoose

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Users/ryanhillary/Desktop/nodejs/userDB');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
  console.log("Connected Successfully")
});

var Schema = mongoose.Schema;

var userSchema = new Schema({
  userName:  String,
  passWord: String,
  emailAddress:   String,
  });

var Users = mongoose.model('Users',userSchema)

var defaultUser = new Users({userName: 'Test1', passWord: 'Test1', emailAddress:'Test1@awesome.com'})
console.log(defaultUser)
