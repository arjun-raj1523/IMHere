/**
 * Observes master map events to control the second one
 *
 * @param  {H.Map} firstMap  A HERE Map instance within the application
 *  @param  {H.Map} secondMap  A HERE Map instance within the application
 */

function synchronizeMaps(secondMap) {
  // get view model objects for both maps, view model contains all data and
  // utility functions that're related to map's geo state
  var viewModel1 = secondMap.getViewModel(),
      viewModel2 = secondMap.getViewModel();

  // set up view change listener on interactive map
  secondMap.addEventListener('mapviewchange', function() {
    // on every view change take a "snapshot" of a current geo data for
    // interactive map and set this values to the second, non-interactive, map

//ger from parent.js





    viewModel2.setCameraData(viewModel1.getCameraData());
  });
}

function getCurrentLocation(){

navigator.geolocation.getCurrentPosition(onSuccess, onError);


}

function onSuccess(position) {
        var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                            'Longitude: '          + position.coords.longitude             + '<br />' ;

        var location=[position.coords.latitude,position.coords.longitude];


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
staticMapContainer.style.width = '90%';
staticMapContainer.style.height = '360px';

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
var staticMap = new H.Map(staticMapContainer,
  defaultLayers.normal.map,{
  center: {lat: location[0], lng: location[1]},
  zoom: 17
});

var locationMarker = new H.map.Marker({lat:location[0], lng:location[1]});
  staticMap.addObject(locationMarker);

// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
// create beahvior only for the first map
//var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));


// Now use the map as required...
synchronizeMaps(staticMap);


    }

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert("Error Getting Location");
    }


getCurrentLocation();

setInterval(getCurrentLocation, 10000);
