console.log("Start")
//console.log(process.argv)
var testOption = '/signin'
var userName = 'Test2'
var passWord = 'Test2'

//attempt to make a handler, will be made into a function later:

//if(testOption.localeCompare('/signin') == 0){
if('/signin' == testOption) {
  console.log("Validating User")

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

  Users.find().distinct('userName', function(error, ids) {
    // ids is an array of all ObjectIds
    console.log("Found the following Users")
    console.log(ids)
  });

  Users.findOne({ 'userName': userName , 'passWord': passWord }, function (err, users) {
    if (users == null) {
      //got nothing for ya
      console.log('NOT FOUND')
      //return handleError(err)
    }
    else {
      //found send it off
      console.log('Found')
      console.log(users.userName, users.passWord, users.emailAddress)
      var jsonBro = JSON.stringify(users)
      console.log(jsonBro)
      mongoose.connection.close()
    }
  })
}

if(testOption == '/signup'){
  console.log("Adding New User")
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

 //Should I be checking for duplcate users and returning an error if the user already exists?

  var defaultUser = new Users({userName: userName, passWord: passWord, emailAddress: emailAddress})
  console.log(defaultUser)

  defaultUser.save(function (err, data) {
  if (err) console.log(err);
  else console.log('Saved ', data );
  });
}



if(testOption == '/post_question'){
  console.log("Creating a New Post")
  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/Users/ryanhillary/Desktop/nodejs/userDB');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback () {
    // yay!
    console.log("Connected to usersDB Successfully")
  });

   var Schema = mongoose.Schema;

  var messageSchema = new Schema({
    userName: String,
    tagTopics: [String], // possible method to find search results
    title: String, 
    messageType:   String,
    messageBody: String,
    childrenIds: Array,
    voteNum: Number
  });
  
  var messageInput = mongoose.model('Messages',messageSchema)
  
  var newMessage = new messageInput({userName: userName, tagTopics: userTagTopics, title: userTitle, messageType: userMessageType, messageBody: userMessageBody, childrenIds: [], voteNum: userVoteNum})

  console.log(newMessage)

  newMessage.save(function (err, data) {
  if (err) console.log(err);
  else console.log('Saved ', data );
  //console.log(data)
  console.log("ID from recent addition: ")
  console.log(data._id)
  mongoose.connection.close()
  });
}





//Add new User
//logIn
//userInformation
//newQuestion
//newResponse
if(testOption == '/post_response'){
  console.log("Creating a New Response")
  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/Users/ryanhillary/Desktop/nodejs/userDB');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback () {
    // yay!
    console.log("Connected to usersDB Successfully")
  });

  var Schema = mongoose.Schema;

  var responseSchema = new Schema({
    //messageId = ObjectId, //built in to mongoDB, its one freaking long ID
    userName:  String,
    userName: String, 
    tagTopics: [String], // possible method to find search results
    //title: String, 
    messageType:   String,
    messageBody: String,
    parentIdNum: Array,
    voteNum: Number
  });
  
  var responseInput = mongoose.model('responseMessages',responseSchema)
  
  var newResponse = new responseInput({userName: userName, tagTopics: userTagTopics, messageType: 'Response', messageBody: userMessageBody, parentIdNum: parentID, voteNum: userVoteNum})

  var newChildID = ''

  newResponse.save(function (err, data) {
  if (err) {
    console.log(err);
  }
  else {
    console.log('Saved New Response ', data );
    newChildID = data._id
    console.log('GotID:',newChildID)
  }//get the ID
  });
  
  var messageSchema = new Schema({
    userName: String,
    tagTopics: [String], // possible method to find search results
    title: String, 
    messageType:   String,
    messageBody: String,
    childrenIds: Array,
    voteNum: Number
  });
  
  var messageInput = mongoose.model('Messages',messageSchema)

  messageInput.findById(parentID, function (err, data) {
    if (err){
      console.log("NOT FOUND")
      //return res.send("contact create error: " + err);
    } 
    console.log(data)
    messageInput.findByIdAndUpdate(
    data._id,
    {$push: {"childrenIds": [newChildID]}},
    {upsert: true},
    function(err, model) {
        console.log("SUCCESS")
        //console.log(err);
        console.log(model)
        mongoose.connection.close()
    }
    )

});

}



//votingFunc
//deleteMessage
//deleteResponse
//getOneQuestion
//getOneReponse


console.log("Outside of loop")


console.log("Outside of loop")



