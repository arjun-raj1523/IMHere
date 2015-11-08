/**
 * Observes master map events to control the second one
 *
 * @param  {H.Map} firstMap  A HERE Map instance within the application
 *  @param  {H.Map} secondMap  A HERE Map instance within the application
 */

//get Data from parent

function synchronizeMaps() {
  // get view model objects for both maps, view model contains all data and
  // utility functions that're related to map's geo state
  //var viewModel1 = secondMap.getViewModel(),
  //viewModel2 = secondMap.getViewModel();

  // set up view change listener on interactive map
  //secondMap.addEventListener('mapviewchange', function() {
    // on every view change take a "snapshot" of a current geo data for
    // interactive map and set this values to the second, non-interactive, map




$.ajax({

  type: 'POST',

        //data: 'sendid=1234&amp;lat='+ position.coords.latitude +'&amp;longi='+position.coords.longitude ,

        data:{
          sendid: "1234",//NOT to change
          myid: "123"

//            lat: position.coords.latitude,
//            longi: position.coords.longitude

},
url: 'http://arjunraj.net/IMHere/getdata.php',

success: function(response){
  destinationCoordinates=[response.records[0].lat,response.records[0].longi]
            //calculateRouteFromAtoB(platform,destinationCoordinates);
loadMap(destinationCoordinates);

},

error: function(response){


  console.log(response);
console.log("I'm Here");



}




});

/*

$.get("http://arjunraj.net/IMHere/getdata.php", { sendid:"1234"  }, function(d,s){
            
            console.log(d);
            

            console.log('Your comment was successfully added');
      
    });


*/

//viewModel2.setCameraData(viewModel1.getCameraData());
}

function loadMap(destinationCoordinates){

            var platform = new H.service.Platform({
              app_id: 'DemoAppId01082013GAL',
              app_code: 'AJKnXv84fjrb0KIHawS0Tg',
              useCIT: true,
              useHTTPS: true
            });
            var defaultLayers = platform.createDefaultLayers();

// set up containers for the map

//var mapContainer = document.createElement('div');
var staticMapContainer = document.createElement('div');

/*
mapContainer.style.position = 'absolute';
mapContainer.style.width = '87%';
mapContainer.style.height = '360px';
mapContainer.style.margin = '19px';
*/
staticMapContainer.style.position = 'absolute';
staticMapContainer.style.width = '100%';
staticMapContainer.style.height = '250%';

//document.getElementById('map').appendChild(mapContainer);
document.getElementById('panel').appendChild(staticMapContainer);

// initialize a map, this map is interactive
/*
var map = new H.Map(mapContainer,
  defaultLayers.normal.map,{
  center: {lat: 53.430, lng: -2.961},
  zoom: 7
});*/
// initialize a map that will be synchronised


staticMap = new H.Map(staticMapContainer,
  defaultLayers.satellite.map,{
    center: {lat: locationCordinates[0], lng: locationCordinates[1]},
    zoom: 13
  });

 // Create the default UI:
 var ui = H.ui.UI.createDefault(staticMap, defaultLayers);

 var locationMarker = new H.map.Marker({lat:locationCordinates[0], lng:locationCordinates[1]});
 staticMap.addObject(locationMarker);

// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
// create beahvior only for the first map
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(staticMap));

calculateRouteFromAtoB(platform,locationCordinates,destinationCoordinates);


//console.log('Your comment was successfully added');

}

function getCurrentLocation(){

  navigator.geolocation.getCurrentPosition(onSuccess, onError);


}

function onSuccess(position) {
  /*
  var element = document.getElementById('geolocation');
  element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
  'Longitude: '          + position.coords.longitude             + '<br />' ;
*/
  locationCordinates=[position.coords.latitude,position.coords.longitude];
   
synchronizeMaps();

}

function onSuccessRoute(result) {
  var route = result.response.route[0];
 /*
  * The styling of the route response on the map is entirely under the developer's control.
  * A representitive styling can be found the full JS + HTML code of this example
  * in the functions below:
  */

  //console.log(result.response.route[0].leg[0].maneuver[0].instruction);

  addRouteShapeToMap(route);
  

  
  // ... etc.
}

//Add route to Map

function addRouteShapeToMap(route){
  var strip = new H.geo.Strip(),
  routeShape = route.shape,
  polyline;

  routeShape.forEach(function(point) {
    var parts = point.split(',');
    strip.pushLatLngAlt(parts[0], parts[1]);
  });

  polyline = new H.map.Polyline(strip, {
    style: {
      lineWidth: 4,
      strokeColor: 'rgba(0, 128, 255, 0.7)'
    }
  });
  // Add the polyline to the map
  staticMap.addObject(polyline);
  // And zoom to its bounding rectangle
  staticMap.setViewBounds(polyline.getBounds(), true);
}


function calculateRouteFromAtoB (platform,locationCordinates,destinationCoordinates) {

    //current locaiton

    var location_1_1=String(locationCordinates[0]);
    var location_1_2=String(locationCordinates[1]);

    //destination sent from parent

    var location_2_1=String(destinationCoordinates[0]-0.01);
    var location_2_2=String(destinationCoordinates[1]-0.01);


    var locationMarker = new H.map.Marker({lat:destinationCoordinates[0]-0.01, lng:destinationCoordinates[1]-0.01});
    staticMap.addObject(locationMarker);
    var router = platform.getRoutingService(),


    routeRequestParams = {
      mode: 'shortest;pedestrian',
      representation: 'display',
      routeattributes : 'waypoints,summary,shape,legs',
      
      waypoint0: location_1_1+','+location_1_2, 
      waypoint1: location_2_1+','+location_2_2 
    };


    router.calculateRoute(
      routeRequestParams,
      onSuccessRoute,
      onError
      );
  }


    // onError Callback receives a PositionError object
    //
    function onError(error) {
      alert("Error Getting Location");
    }


    getCurrentLocation();



    setInterval(getCurrentLocation, 20000);
