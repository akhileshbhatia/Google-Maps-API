var myMaps = {
  gblMapRef: null,
  Init: function () {
    var me = myMaps;
    me.InitializeMaps();
    me.BindEvents();
  },

  BindEvents: function () {
    var me = myMaps;
    
    $("#btnSearch").off("click");
    $("#btnSearch").on("click", function () {
      me.FindRoute($("#txtSource").val().trim(), $("#txtDestination").val().trim());
    });

    me.gblMapRef.addListener('click', function (event) {
      me.PlaceMarker(event.latLng);
    });

    $(".liSearchOptions").off("click");
    $(".liSearchOptions").on("click", function (event) {
      if(this.id == "liShowCurLocatn")
        me.ShowCurrentLocation(false);
      else
        me.ShowCurrentLocation(true);
    });

    $("#logOff").off("click");
    $("#logOff").on("click",function(){
      sessionStorage.clear();
      window.location.replace("/");
    });
  },

  ShowCurrentLocation: function(setAsSource){
    var me = myMaps;
    $(".liSearchOptions").find("span").hide(); //hide all spans within liSearchOptions class
    //show only those that are required
    if(setAsSource){
      $("#liSetCurLocAsSrc").find("span").show();
    }
    else{
      $("#liShowCurLocatn").find("span").show();
    }
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){
        var curPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var marker = new google.maps.Marker({position: curPosition});
        marker.setMap(me.gblMapRef);
        me.gblMapRef.setCenter(curPosition);
        if(setAsSource){ // check if user wants to set current location as source
          var geocoder = new google.maps.Geocoder;
          geocoder.geocode({"location":curPosition},function(results,status){ //get the address from the lat and long
            if(status === "OK" && results[1]){
              $("#txtSource").val(results[1].formatted_address);
            }
          });
        }
      },function(){
        console.log("Following error in receiving current location: "+failure.message);
      });
    }
  },
  PlaceMarker: function (location) {
    var me = myMaps;
    var marker = new google.maps.Marker({
      position: location,
      map: me.gblMapRef
    });


    marker.addListener("dblclick", function () {
      marker.setMap(null);
    });

    marker.addListener("click", function () {
      //marker.setMap(null);
      var infowindow = new google.maps.InfoWindow({
        content: $("#divInfoWindowContent").html(),
        maxWidth: 300
      });
      infowindow.open(me.gblMapRef, marker);
    });

  },

  FindRoute: function (origin, destination) {
    var me = myMaps;
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    $("#divDirectionPanel").empty();
    directionsDisplay.setPanel($("#divDirectionPanel")[0]);
    directionsDisplay.setMap(null);
    directionsDisplay.setMap(me.CreateMap(21.1458, 79.0882));
    var request = {
      origin: origin,
      destination: destination,
      travelMode: 'DRIVING'
    };
    directionsService.route(request, function (response, status) {
      if (status == 'OK') {
        directionsDisplay.setDirections(response);
        $("#divMap").css("width", "65%");
        $("#divOuterDirectionPanel").show();
        //$("#" + id).find("span").show();
      }
    });
  },

  CreateMap: function (latitude, longitude) {
    var me = myMaps;
    var map = new google.maps.Map($("#divMap")[0], {
      center: { lat: latitude, lng: longitude },
      scrollwheel: false,
      zoom: 15
    });
    me.gblMapRef = map;
    return map;
  },

  InitializeMaps: function () {
    var me = myMaps;
    var map = me.CreateMap(21.1458, 79.0882);

    var marker = new google.maps.Marker({ position: { lat: 21.1458, lng: 79.0882 } });
    marker.setMap(map);

    new google.maps.places.Autocomplete($("#txtSource")[0]).bindTo('bounds', map);
    new google.maps.places.Autocomplete($("#txtDestination")[0]).bindTo('bounds', map);

  },

}

$(function () {
  if(sessionStorage.user!=null || sessionStorage.user!=undefined)
  myMaps.Init();
  else{
    sessionStorage.clear();
    window.location.replace("/");
  }
});
