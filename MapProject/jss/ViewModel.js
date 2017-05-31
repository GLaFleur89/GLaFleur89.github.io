function initMap() {
  var input = document.getElementById("home");
  var autocomplete = new google.maps.places.Autocomplete(input);
};

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
  var FSdata = [];
  var markers = [];
  var clickedmarker = [];
  var labels="123456789";
  var labelindex = 0;

  this.sethome = function () {
    var home = document.getElementById("home").value;
    var geocoder = new google.maps.Geocoder();
    if (home == "") {
      alert("No location selected!");
    } else {
      self.markerslist.removeAll();
      self.filterlist.removeAll();
      self.headingList(true);
      geocodeAddress(geocoder);
      }
  };

  function geocodeAddress(geocoder) {
    var address = document.getElementById("home").value;
    geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
    var baselatlong =(results[0].geometry.location);
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15
    });
    map.setCenter(results[0].geometry.location);
    searchplaces(results[0].geometry.location);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }})
  };

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
    }
      labelindex=0;
  }

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

function toggleAnimation() {
  if(markers[i].getAnimation() !== null) {
    markers[i].setAnimation(null);} else {
      markers[i].setAnimation(google.maps.Animation.BOUNCE);
    }
}

this.animateicons = function (clickedPlace) {
      for (i=0; i<markers.length; i++) {
        if (markers[i].title == clickedPlace.title) {
          ll = markers[i].position.lat()+","+markers[i].position.lng();
          toggleAnimation();
          detailsFS(ll);
        console.log(FSdata);
        console.log(FSdata[0]);
          infowindow.setContent("<div><h3>"+markers[i].title+"</h3>"+markers[i].address+"</div><div>Google Rating:"+markers[i].rating+"</div><div><h4>Stats from FourSquare:</h4>Check-ins: "+FSdata.checkinsCount+"<br>No. Users: "+FSdata.usersCount+"<br>No. Tips: "+FSdata.tipCount+"</div>");
          infowindow.open(map,markers[i]);
        } else {
          markers[i].setAnimation(null);
      }}
    };

function detailsWeather(title) {
  $.ajax({
    url:"http://autocomplete.wunderground.com/aq?",
    data: {
      query: title
    },
    type: "get",
    dataType: "json"
  })
  .done(function(result){
    // add function for info window
    console.log(result);
      })
  .fail(function( xhr, status, errorThrown ) {
    alert(errorThrown);
  });
};

function detailsFS(place) {
  FSdata = [];
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
      var stats= result.response.venues[0].stats;
      FSdata.push(stats);
    } else {
      alert(result.meta.errorDetail);
    }
      })
  .fail(function( xhr, status, errorThrown ) {
    alert(errorThrown);
  });
}

}
