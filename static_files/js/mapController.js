app.controller("mapController",function($scope,NgMap){
  var map;
  NgMap.getMap().then(function(mapDetails){
    map = mapDetails;
  });

  $scope.placeChanged = function(){
    $scope.place = this.getPlace();
    console.log("Location: "+$scope.place.geometry.location);
  }
})
