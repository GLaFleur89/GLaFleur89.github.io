var map;
      function initMap() {


        var input = document.getElementById("home");
        var autocomplete = new google.maps.places.Autocomplete(input);
        var geocoder = new google.maps.Geocoder();

        document.getElementById("homebutton").addEventListener("click",sethome);

        function sethome() {
          var home = document.getElementById("home").value;

          if (home == "") {
            alert("No location selected!");
          } else {
            geocodeAddress(geocoder);
          }
          function geocodeAddress(geocoder) {
            var address = document.getElementById("home").value;
      geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
            var baselatlong =(results[0].geometry.location);
            map = new google.maps.Map(document.getElementById('map'), {
              zoom: 15
            });
            map.setCenter(results[0].geometry.location);
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      })};
        };



      }
