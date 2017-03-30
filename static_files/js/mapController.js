app.controller("mapController",function($scope,NgMap,$window){
  var map;
  //$scope.showDirections = false;
  $scope.source = "";
  $scope.destination="";

  NgMap.getMap().then(function(mapDetails){
    map = mapDetails;
  });

  //function just for reference
  $scope.PlaceChanged = function(){
    $scope.place = this.getPlace();
    console.log("Location: "+$scope.place.geometry.location);
  }

  $scope.logOff = function(){
    $window.location.href="/";
  }
})
