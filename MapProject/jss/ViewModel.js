//  Is callback function from loading google apis. Adds autocomplete for input box.
function initMap() {
  var input = document.getElementById("home");
  var autocomplete = new google.maps.places.Autocomplete(input);
};

// Creates KO ViewModel as well as setting all the variables needed for the below functions.
var myViewModel = function() {
  this.markerslist = ko.observableArray();
  this.headingList = ko.observable(false);
  this.selectedPlace = ko.observable();
  this.filterlist = ko.observableArray();

  var info="";
  var self = this;
  var map;
  var infowindow;
  var ll;
  var markers = [];
  var clickedmarker = [];
  var labels="123456789";
  var labelindex = 0;

/*Main function that determines location from geocode api
and resets all markers and filters when new location chosen.*/
  this.sethome = function () {
    var home = document.getElementById("home").value;
    var geocoder = new google.maps.Geocoder();
    if (home == "") {
      alert("No location selected!");
    } else {
      markers.length = 0;
      self.markerslist.removeAll();
      self.filterlist.removeAll();
      self.headingList(true);
      geocodeAddress(geocoder);
      }
  };

/*Determines location of  map using geocode result to determine the maps center.
initialises searchPLaces function to get data for map.*/
  function geocodeAddress(geocoder) {
    var address = document.getElementById("home").value;
    geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
    var baselatlong =(results[0].geometry.location);
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14
    });
    map.setCenter(results[0].geometry.location);
    searchplaces(results[0].geometry.location);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }})
  };

//Places api search for data about location chosen and creates markers for the map.
  function searchplaces(base) {
    hidemarkers(markers);
    var bounds = map.getBounds();
    var places = new google.maps.places.PlacesService(map);
    places.nearbySearch({
      location: base,
      radius: 500
    }, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        createMarkers(results);
        infowindow = new google.maps.InfoWindow();
      }else {
        alert('Markers was not successful for the following reason: ' + status);
      }});
  };


  function hidemarkers(marker) {
    for (i=0; i<marker.length; i++) {
      markers[i].setMap(null);}
  }

/*creates the markers using details from places API search.
limits markers to no more than 5.
pushes markers into an observable KO array and
adds click event to markers for animation.*/
  function createMarkers(places) {
    var bounds = new google.maps.LatLngBounds();
    var points = places.length;
    if (points < 6) {
      alert("Only "+(points-1)+" points of interest found");
      labelindex=0;
    }else {
      points = 6;
    };
    for (var i = 1; i < points; i++) {
      var place = places[i];
      self.markerslist.push({title:place.name,id:i});
      self.filterlist.push({title:place.name,id:i});
      var icon = {
        url: 'http://maps.google.com/mapfiles/ms/micons/red-pushpin.png',
        size: new google.maps.Size(35, 35),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(15, 34),
        scaledSize: new google.maps.Size(25, 25)
      };
      // Create a marker for each place.
      var marker = new google.maps.Marker({
        icon:icon,
        map: map,
        title: place.name,
        position: place.geometry.location,
        id: place.place_id,
        animation: google.maps.Animation.DROP,
        label: labels[labelindex++],
        rating: place.rating,
        address: place.vicinity
      });

      marker.addListener('click', function(holder) {
        self.animateicons(this);
    });
      markers.push(marker);
    };
      labelindex=0;
  };

/*filter function that runs when filter input selected.
makes only selected locations marker visible.*/
this.filter = function () {
  var filterChoice = self.selectedPlace();
  self.markerslist.removeAll();
  for (var i = 0 ; i < markers.length ; i++) {
    if (filterChoice == markers[i].title) {
      markers[i].setVisible(true);
      self.markerslist.push({title:markers[i].title,id:i});
    }else {
      if (filterChoice == null) {
        self.markerslist.push({title:markers[i].title,id:i});
        markers[i].setVisible(true);
      }else {
      markers[i].setVisible(false);
    }}
  };
};

/*This is the function that runs when the markers or list is clicked.
It also creates and displays the info windows when locations clicked*/
this.animateicons = function (clickedPlace) {
      for (i=0; i<markers.length; i++) {
        if (markers[i].title == clickedPlace.title) {
          ll = markers[i].position.lat()+","+markers[i].position.lng();
          markers[i].setAnimation(google.maps.Animation.BOUNCE);
          setTimeout(toggleAnimation(),7000);
          detailsFS(ll,markers[i].title,markers[i].address,markers[i].rating);
          infowindow.open(map,markers[i]);
        } else {
          markers[i].setAnimation(null);
      }}
    };

    //toggles the animation of the markers so that the bouncing can be stopped by clicking on the marker again.
    function toggleAnimation() {
            markers[i].setAnimation(null);
        };

/*This is the ajax request for the foursquare API.
This function also sets the content for the Info Windows.*/
function detailsFS(place,title,address,rating) {
venues = [];
  $.ajax({
    url:"https://api.foursquare.com/v2/venues/search?",
    data: {
      ll: place,
      limit: 1,
      oauth_token: "2QL42Q4O35Z1JOOMMVZIZ3AX3JHQ52FMYFPHWXCTATUTCEN2",
      v: 20170601,
      m: 'foursquare'
    },
    type: "get",
    dataType: "jsonP"
  })
  .done(function(result){
    if (result.meta.code == 200) {
    var  a = result.response.venues["0"].stats;
    infowindow.setContent("<div><h3>"+title+"</h3>"+address+"</div><div>Google Rating:"+rating+"</div><div><h4>Closest FourSquare location: "+result.response.venues["0"].name+"</h4>Check-ins: "+a.checkinsCount+"<br>No. Users: "+a.usersCount+"<br>No. Tips: "+a.tipCount+"</div>");
    } else {
      alert(result.meta.errorDetail);
    }
      })
  .fail(function( xhr, status, errorThrown ) {
    alert(errorThrown);
  });
};
}
