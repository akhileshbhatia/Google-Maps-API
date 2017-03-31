app.controller("mapController",function($scope,NgMap,$window){
  var map;
  $scope.showDirections = false;
  $scope.source = "";
  $scope.destination="";
  var currentPosLatLng;

  NgMap.getMap().then(function(mapDetails){
    map = mapDetails;
    currentPosLatLng = map.getCenter(); //storing the center of current position
  });

  //function just for reference
  $scope.PlaceChanged = function(){
    var place = this.getPlace();
    console.log("Location: "+place.geometry.location);
  }

  $scope.CheckIfShowDirections = function(){
    //if both source and destination are empty
    if($scope.source.length == 0 && $scope.destination.length == 0){
        $scope.showDirections = false; //remove directions
        map.directionsRenderers.dir.setMap(null); // remove directions panel
        map.setCenter(currentPosLatLng);//set the center back to current position
    }
  }

  $scope.LogOff = function(){
    $window.location.href="/";
  }

  $scope.$watch("showDirections",function(){
    //when showDirections is set to true, only then show directions on map (essentially stopping two way binding)
    if($scope.showDirections)
      map.directionsRenderers.dir.setMap(map);
  })
})
