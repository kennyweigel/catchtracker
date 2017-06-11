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
  var initializeStandardMap = function() {
    return new google.maps.Map(document.getElementById('map'), {
      center: eastCoastPosition,
      zoom: 4,
      mapTypeId: 'hybrid'
    });
  };

  var getCatchPosition = function() {
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
      }, 15);
    } else if (navigator.geolocation) { // Try HTML5 geolocation.
      navigator.geolocation.getCurrentPosition(function(position) {
        handleMarkerPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }, 15);
      }, function() {
        $('#mapGeolocationFailed').show();
        handleMarkerPosition(pos, 4);
      });
    } else {
      // Browser doesn't support Geolocation
      $('#mapGeolocationFailed').show();
      handleMarkerPosition(pos, 4);
    }
  };

  var handleMarkerPosition = function(pos, zoom) {
    var marker = new google.maps.Marker({
      position: pos,
      map: map,
      draggable:true
    });

    map.setCenter(pos);
    map.setZoom(zoom);
    google.maps.event.addListener(marker,'dragend',function(overlay, point) {
      document.getElementById('lat').value = marker.getPosition().lat();
      document.getElementById('lng').value = marker.getPosition().lng();
    });
  };

  var initMap = function() {
    // load map centered on east coast by default
    if (document.getElementById('map') === null)
      return;
    map = initializeStandardMap();
    getCatchPosition();
  };

  $(document).on('turbolinks:load', initMap);
})();
