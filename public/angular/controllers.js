'use strict';

/* App Module */

var bioApp = angular.module('bioApp',[]);

/* Controllers */

bioApp.controller('signup', ['$scope', '$http',
	function($scope, $http){
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
				valid = $scope.validateData($scope.requestedUserName,$scope.requestedPassword,$scope.verifyPassword,$scope.email);
			}
		}

		$scope.validateData = function(username,password,vpassword,email){
			if(password !==vpassword){
				$scope.errorMsg = "The passwords did not match";
				$scope.passwordA = '*';
				$scope.vpasswordA = '*';
				$scope.requestedPassword = '';
				$scope.verifyPassword = '';
				return false;
			}
			if(email.indexOf('@') === -1 || email.indexOf('.') === -1){
				$scope.errorMsg = "A valid email address is required";
				$scope.email = '';
				$scope.emailA = '*';
				return false;
			}
			var jsonCheckForDuplicateUsername = {
				//Need to add code to create json query and send it to mongodb
			}
			//add code to evaluate mongodb response
			//add code to return false if username is already taken
			//add code to create new mongodb record is username is not taken
			return true
		}
	}]);

bioApp.controller('signin', ['$scope', '$http',
	function($scope, $http){
		$scope.errorMsg = '';
		$scope.username = '';
		$scope.password = '';
		$scope.userA = '';
		$scope.passwordA = '';
	
		$scope.signin = function(){
			$scope.errorMsg = '';
			$scope.userA = '';
			$scope.passwordA = '';

			var valid = true;
			if ($scope.username === ''){$scope.userA='*';valid=false;}
			if ($scope.password === ''){$scope.passwordA ='*';valid=false;}
			if(!valid){
				$scope.errorMsg = "Please be sure to fill in all data fields";
			}else{
				//need to add code to query for username and password combination
				//if query returns false then alert the user
				//else proceed
			}
		}
	}]);
