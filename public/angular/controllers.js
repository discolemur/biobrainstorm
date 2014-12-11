'use strict';

/* App Module */

var bioApp = angular.module('bioApp',['ngCookies']);

/* Handy functions */


/* Controllers */

bioApp.controller('signup', ['$scope', '$http','$window','$cookieStore',
	function($scope, $http, $window, $cookieStore){
		$scope.errorMsg = ''
		$scope.usernameA = ''
		$scope.passwordA = ''
		$scope.vpasswordA = ''
		$scope.emailA = ''
		$scope.requestedUserName = '';
		$scope.requestedPassword = '';
		$scope.verifyPassword = '';
		$scope.email = '';		

		$scope.signup = function(){
			var valid = true
			$scope.errorMsg = ''
			$scope.usernameA = ''
			$scope.passwordA = ''
			$scope.vpasswordA = ''
			$scope.emailA = ''

			if ($scope.requestedUserName === ''){$scope.usernameA = '*';valid=false;}
			if ($scope.requestedPassword === ''){$scope.passwordA = '*';valid=false;}
			if ($scope.verifyPassword === ''){$scope.vpasswordA = '*';valid=false;}
			if ($scope.email === ''){$scope.emailA = '*';valid=false;} 
			if (!valid){
				$scope.errorMsg = "Please be sure to fill in all data fields";
			}else{
				$scope.validateData($scope.requestedUserName,$scope.requestedPassword,$scope.verifyPassword,$scope.email);
			}
		}

		$scope.validateData = function(username,password,vpassword,email){
			var err = null;
			if (password != vpassword) {
				err = "The passwords do not match.";
			}
			if (password == username && !err) {
				err = "Your password cannot be your username.";
			}
			if (password.length < 8 && !err) {
				err =  "Your password must be at least 8 characters.";
			}
			if (err) {
				$scope.errorMsg = err;
				$scope.passwordA = '*';
				$scope.vpasswordA = '*';
				$scope.requestedPassword = '';
				$scope.verifyPassword = '';
				return false;
			}
			/*alert("You clicked the sign up button with these credentials\n" +
				$scope.requestedUserName + "\n" + 
				$scope.requestedPassword + "\n" + 
				$scope.verifyPassword + "\n" + 
				$scope.email + "\n");*/
			if(email.indexOf('@') === -1 || email.indexOf('.') === -1){
				$scope.errorMsg = "A valid email address is required";
				$scope.email = '';
				$scope.emailA = '*';
				return false;
			}
			var jsonSignUpText = '{"userName":"' + username + '","passWord":"' + password + '","emailAddress":"' + email + '"}';
			var jsonSignUp = JSON.parse(jsonSignUpText);

			$http.post("/signup_user", jsonSignUp).success(function(data){
				if (data.status == 'Failure') {
					$scope.errorMsg = 'Internal server error.';
				}else if(data.status === 'Rejected'){
					$scope.errorMsg = "Unable to register selected username.";
				}else{
					$cookieStore.put('auth', true);
					$cookieStore.put('username', username);
					$cookieStore.put('password', password);
					$scope.AUTH = true;
					$window.location.href = '/home';
				}
			});
		}

		
	}]);

bioApp.controller('header', ['$scope', '$cookieStore' ,
	function($scope, $cookieStore){

		$scope.signout = function() {
			$cookieStore.remove('searchResults');
			$cookieStore.remove('username');
			$cookieStore.remove('password');
			$cookieStore.put('auth', false);
		}
		$scope.isAuth = function() {
			return $cookieStore.get('auth');
		}
		$scope.getUsername = function() {
			return $cookieStore.get('username');
		}
	}]);

bioApp.controller('signin', ['$scope', '$http', '$cookieStore', '$window',
	function($scope, $http, $cookieStore, $window){
		$scope.errorMsg = '';
		$scope.username = '';
		$scope.password = '';
		$scope.userA = '';
		$scope.passwordA = '';
		$cookieStore.put('auth', false);
		$scope.AUTH = $cookieStore.get('auth');
		$scope.signin = function() {
			$scope.errorMsg = '';
			$scope.userA = '';
			$scope.passwordA = '';

			var valid = true;
			if ($scope.username === ''){$scope.userA='*';valid=false;}
			if ($scope.password === ''){$scope.passwordA ='*';valid=false;}
			if(!valid){
				$scope.errorMsg = "Please be sure to fill in all data fields";
			}else{
				var jsonSignInText = '{"userName":"' + $scope.username + '","passWord":"' + $scope.password + '"}';
				var jsonSignIn = JSON.parse(jsonSignInText);
				$http.post("/signin_user", jsonSignIn).success(function(data){
					if(data.status === 'Failure'){
						$scope.errorMsg = 'Internal server error.';
					} else if(data.status === 'Invalid'){
						$scope.errorMsg = 'Invalid username or password';
					}else{
						$cookieStore.put('auth', true);
						$cookieStore.put('username', $scope.username);
						$cookieStore.put('password', $scope.password);
						$scope.AUTH = true;
						$window.location.href = '/home';
					}
				});
			}
		}
	}]);


bioApp.controller('post_question', ['$scope', '$http', '$cookieStore',
	function($scope, $http, $cookieStore){
		$scope.description;
		$scope.tags;
	
		$scope.post_question = function(){
			//need to update this to query mongo db using username and password
			//and if matching record is found do something with it
			if (!$cookieStore.get('auth')) {
				alert("Sorry, you must sign in before posting questions.");
			} else {
/*				MiddleWare -> Back End JSON
				userName: String,
				tagTopics: [String],
				title: String, //title of the question
				messageBody: String, //entire Body Text */
				var tags = $scope.tags.toLowerCase().split(" ");
				var jsonPostQuestion = { title: $scope.data_title, userName: $cookieStore.get('username'), messageBody: $scope.description, tagTopics: tags };
			//	alert("You clicked the post button\nDescription: " + jsonPostQuestion.messageBody + "\nTags: " + jsonPostQuestion.tagTopics + "\nTitle: " + jsonPostQuestion.title + "\nUsername: " + jsonPostQuestion.userName);
				$http.post("/post_question", jsonPostQuestion).success(function(data){
					if(data.status != 'Success') {
						alert('Sorry, not posted.' + data.status + jsonPostQuestion);
					}
				});
			}
		}
	}]);

bioApp.controller('contact_us', ['$scope', '$http',
	function($scope, $http){
		$scope.email;
		$scope.comment;
	
		$scope.contact_us = function(){
			alert("You clicked the send message button\nComment: " + $scope.comment + "\nEmail: " + $scope.email);
			//need to update this to query mongo db using username and password
			//and if matching record is found do something with it
		}
	}]);

bioApp.controller('search', ['$scope', '$http', '$window', '$cookieStore',
	function($scope, $http, $window, $cookieStore){
		$scope.headerSearchBar = '';
		$scope.searchBar = '';
		$scope.results = $cookieStore.get('searchResults'); 

		$scope.deleteQuestion = function(id) {
			var jsonID = { _id: id };
			$http.delete("/delete_question", jsonID).success(function(data) {
				if(data.status != 'Success') {
					alert('Sorry, we failed to remove that question. Try again later.');
				} else {
					alert('Question has been removed.');
				}
			});
		}

		$scope.headerSearch = function(){
			var query = $scope.headerSearchBar;
			$scope.search(query);
		}

		$scope.submitSearch = function(){
			var query = $scope.searchBar;
			$scope.search(query);
		}

		$scope.isCurrentUser = function(user) {
			if (user == $cookieStore.get('username')) {
				return true;
			}
			return false;
		}

		$scope.search = function(q){
			var jsonSearchText = '{"searchValue":"' + q + '"}';
			var jsonSearch = JSON.parse(jsonSearchText);
			$http.post("/search", jsonSearch).success(function(data){
				$cookieStore.put('searchResults',data);
				$window.location.href = '/search_results';
			});
		}
	}]);
