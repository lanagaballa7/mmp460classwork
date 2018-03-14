document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelectorAll('#map').length > 0)
  {
    if (document.querySelector('html').lang)
      lang = document.querySelector('html').lang;
    else
      lang = 'en';

    var js_file = document.createElement('script');
    js_file.type = 'text/javascript';
  js_file.src = 'https://maps.googleapis.com/maps/api/js?callback=initMap&signed_in=true&key=AIzaSyB_MfNUJo5cSmGuNzLH8vTVUhTuWPOU_dA&language=' + lang;
    document.getElementsByTagName('head')[0].appendChild(js_file);
  }
});

var map;

function initMap()
{
    var building1= {lat: 40.7279479, lng:-73.9802211};
    var building2 ={lat: 37.6,lng:-95.665}
    var building3 ={lat:13.0390905,lng:101.490104}
    var building4={lat:61.5240, lng:105.3188}
    var building5={lat:-25.2744,lng:133.7751}
    var lowereastside = {lat: 40.718521, lng:-73.9955198};
  map = new google.maps.Map(document.getElementById('map'), {
    center: lowereastside,
    zoom: 13
  });

  fetch('markers.json')
    .then(function(response){return response.json()})
    .then(plotMarkers);

}

var markers;
var marker;
var bounds;

function plotMarkers(m)
{
  markers = [];
  bounds = new google.maps.LatLngBounds();

  m.forEach(function (marker) {
    var position = new google.maps.LatLng(marker.lat, marker.lng);
    var infowindow = new google.maps.InfoWindow({
          content: marker.description
    }); 

    
//    marker =  new google.maps.Marker({
//              position: position,
//              map: map,
//              animation: google.maps.Animation.DROP
//              })
      var marker = new google.maps.Marker({
          position: building1,
              map: map,
            animation: google.maps.Animation.DROP 
                  
          
      })
    marker.addListener('click', function() {
    infowindow.open(map, marker);
    });
  
    
    bounds.extend(position);
  });
  map.fitBounds(bounds);
}
