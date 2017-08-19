function initMap() {
  var uluru = {lat: -25.363, lng: 131.044};
  var mapDiv = document.getElementById('map');
  var latlng = new google.maps.LatLng(-25.363,131.044);
  var mapOptions = {
      zoom: 8,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  var map = new google.maps.Map(mapDiv, mapOptions);

  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}