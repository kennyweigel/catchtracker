// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require turbolinks
//= require_tree .
//= require jquery
//= require bootstrap-sprockets
//= require select2
//= require moment
//= require bootstrap-datetimepicker
//= require markerclusterer

(function() {
  var docReady = function() {
    console.log('doc ready');
    window.CatchTracker = window.CatchTracker || {};

    $('select').select2({
      theme: 'bootstrap',
      width: '100%'
    });

    $('#datetimepicker').datetimepicker({
      defaultDate: window.CatchTracker.catchDefaultTime,
      format: 'YYYY-MM-DD hh:mm a Z'
    });

  };

  $(document).on('turbolinks:load', docReady);

})();

(function() {
  window.CatchTracker = window.CatchTracker || {};

  var map;
  var infoWindow;
  var eastCoastPosition = {lat: 39, lng: -73};
  var initializeStandardMap = function(mapId) {
    return new google.maps.Map(document.getElementById(mapId), {
      center: eastCoastPosition,
      zoom: 4,
      mapTypeId: 'hybrid'
    });
  };

  var getCatchPosition = function(allowDrag) {
    // initialze with standard position
    var pos = eastCoastPosition;

    // if a position is already specified (ex: catch edit page)
    if (document.getElementById('lat') !== null &&
      document.getElementById('lat').value &&
      document.getElementById('lng') !== null &&
      document.getElementById('lng').value) {
      handleMarkerPosition({
        lat: parseFloat(document.getElementById('lat').value),
        lng: parseFloat(document.getElementById('lng').value)
      }, 15, allowDrag);
    } else if (window.CatchTracker.catchPosition) {
      handleMarkerPosition({
        lat: window.CatchTracker.catchPosition.lat,
        lng: window.CatchTracker.catchPosition.lng
      }, 15, allowDrag);
    } else if (navigator.geolocation) { // Try HTML5 geolocation.
      navigator.geolocation.getCurrentPosition(function(position) {
        document.getElementById('lat').value = position.coords.latitude;
        document.getElementById('lng').value = position.coords.longitude;
        handleMarkerPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }, 15, allowDrag);
      }, function() {
        $('#mapGeolocationFailed').show();
        document.getElementById('lat').value = eastCoastPosition.lat;
        document.getElementById('lng').value = eastCoastPosition.lng;
        handleMarkerPosition(pos, 4, allowDrag);
      });
    } else {
      // Browser doesn't support Geolocation
      $('#mapGeolocationFailed').show();
      document.getElementById('lat').value = eastCoastPosition.lat;
      document.getElementById('lng').value = eastCoastPosition.lng;
      handleMarkerPosition(pos, 4, allowDrag);
    }
  };

  var showClusteredMarkers = function() {
    var markers = window.CatchTracker.catches.map(function(location, i) {
      return new google.maps.Marker({
        position: location
      });
    });

    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers,
        {imagePath: '/assets/images/googlemaps/m'});
  };

  var handleMarkerPosition = function(pos, zoom, allowDrag) {
    var marker = new google.maps.Marker({
      position: pos,
      map: map,
      draggable: allowDrag
    });

    map.setCenter(pos);
    map.setZoom(zoom);

    if (allowDrag) {
      google.maps.event.addListener(marker,'dragend',function(overlay, point) {
        document.getElementById('lat').value = marker.getPosition().lat();
        document.getElementById('lng').value = marker.getPosition().lng();
      });
    }
  };

  var initMap = function() {
    // load map centered on east coast by default
    if ($('#map, #homeMap, #showMap').length === 0)
      return;

    if ($('#map').length !== 0) {
      map = initializeStandardMap('map');
      getCatchPosition(true);
    } else if ($('#showMap').length !== 0) {
      map = initializeStandardMap('showMap');
      getCatchPosition(false);
    } else if ($('#homeMap').length !== 0) {
      map = initializeStandardMap('homeMap');
      showClusteredMarkers();
    }
  };

  $(document).on('turbolinks:load', initMap);
})();
