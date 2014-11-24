console.log("Start")
console.log(process.argv)
var sum = process.argv[2]
console.log(sum)
var fs = require('fs')
var fileStuff = fs.readFile('/Users/ryanhillary/Desktop/nodejs/stuff.txt',callback) // just me figuring things out
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
  console.log("Connected to usersDB Successfully")
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

defaultUser.save(function (err, data) {
if (err) console.log(err);
else console.log('Saved ', data );
});

//console.log(db.collection.getIndexes());

Users.find().distinct('_id', function(error, ids) {
    // ids is an array of all ObjectIds
    console.log("Found the following IDs")
    console.log(ids)
});

mongoose.connect('mongodb://localhost/Users/ryanhillary/Desktop/nodejs/questionsDB');
var dbQuestions = mongoose.connection;
dbQuestions.on('error', console.error.bind(console, 'connection error:'));
dbQuestions.once('open', function callback () {
  // yay!
  console.log("Connected to questionsDB Successfully")
});


var questionsSchema = new Schema({
  //messageId = ObjectId, //built in to mongoDB, its one freaking long ID
  userName:  String, 
  tagTopics: [String], // possible method to find search results
  title: String, 
  //messageType:   String,
  messageBody: String,
  childrenIds: Array,
  voteNum: Number,
});

var Questions = mongoose.model('Questions',questionsSchema)

