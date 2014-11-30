'use strict';

/* App Module */

var bioApp = angular.module('bioApp',[]);

/* Controllers */

bioApp.controller('signup', ['$scope', '$http',
	function($scope, $http){
		$scope.requestedUserName;
		$scope.requestedPassword;
		$scope.verifyPassword;
		$scope.email;		

		$scope.signup = function(){
			if (typeof $scope.requestedUserName === 'undefined' || 
			    typeof $scope.requestedPassword === 'undefined' ||
			    typeof $scope.verifyPassword === 'undefined' ||
			    typeof $scope.email === 'undefined'){
				alert("Please make sure all data fields are completed")
			}
			alert("You clicked the sighn up button with these credentials\n" +
				$scope.requestedUserName + "\n" + 
				$scope.requestedPassword + "\n" + 
				$scope.verifyPassword + "\n" + 
				$scope.email + "\n");
			//need to update this to 1. all fields are entered and valid
			//2.make sure username is not already in use
			//3. create new record to add to mongo database
		}
	}]);

bioApp.controller('signin', ['$scope', '$http',
	function($scope, $http){
		$scope.username;
		$scope.password;
	
		$scope.signin = function(){
			alert("You clicked the sign in button\nUsername: " + $scope.username + "\nPassword: " + $scope.password);
			//need to update this to query mongo db using username and password
			//and if matching record is found do something with it
		}
	}]);
