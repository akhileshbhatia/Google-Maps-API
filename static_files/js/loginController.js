var app = angular.module("loginApp",[]);

app.controller("loginController", function($scope,$http,$window){
  $scope.invalidUser = false;

  $scope.loginUser = function(){
    var credentials = JSON.stringify({"username":$scope.username.trim(),"password":$scope.password.trim()});
    var config = {
      headers : {"Content-Type" : "application/json"}
    }
    $http.post("/api/authenticate",credentials,config)
    .then(
      function(response){
        if(response.data.length > 0){
          $window.location.href ="/map";
        }
        else{
          $scope.invalidUser = true;
        }
      },
      function(err){
        console.log(err);
      }
    )
  }


})
