// Create a map and the infowindow variable
var map, largeInfoWindow;

//Creating a global markers array
var markers = [];

// Listing the Multidisciplinary universities. These is what will be shown to the user
// Source wikipedia 10.10.2017 
// https://en.wikipedia.org/wiki/List_of_universities_in_Finland
var universities = [

  {name: 'University of Helsinki', location: {lat: 60.172635, lng: 24.951042}, Established_Year: 1640},
  {name: 'Åbo Akademi University', location: {lat: 60.450987, lng: 22.277600}, Established_Year: 1918},
  {name: 'University of Turku',  location: {lat: 60.456297, lng: 22.285114 }, Established_Year: 1920},
  {name: 'University of Tampere', location: {lat: 61.493745, lng: 23.778735}, Established_Year: 1925},
  {name: 'University of Oulu', location: {lat: 65.059318, lng: 25.466294}, Established_Year: 1958},
  {name: 'University of Lapland', location: {lat: 66.485863, lng: 25.715528}, Established_Year: 1979},
  {name: 'University of Eastern Finland', location: {lat: 62.603598, lng: 29.744203}, Established_Year: 2010},
  {name: 'University of Vaasa', location: {lat: 63.105084, lng: 21.591550}, Established_Year: 1968},
  {name: 'University of Jyväskylä', location: {lat: 62.236532, lng: 25.731634}, Established_Year: 1934},
  {name: 'Aalto University', location: {lat: 60.186669, lng: 24.827682}, Established_Year: 2010}

];



// Function to initialize the map within the map div
function initMap() {

  // Google maps styles from https://mapstyle.withgoogle.com/
  var styles = [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#523735"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#c9b2a6"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#dcd2be"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#ae9e90"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#93817c"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#a5b076"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#447530"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#fdfcf8"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f8c967"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#e9bc62"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e98d58"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#db8555"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#806b63"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8f7d77"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#b9d3c2"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#92998d"
          }
        ]
      }
  ];


  map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 60.172635, lng: 24.951042},
  zoom: 13,
  styles: styles,
  mapTypeControl: false
  });

  // initialising the info window
  largeInfoWindow = new google.maps.InfoWindow();


  //For Adjusting the map boundries to fit the set zoom area
  // a variable bounds is created
  var bounds = new google.maps.LatLngBounds();

  // default Markers style
  var defaultIcon = makeMarkerIcon('0091ff');

  // Create a "highlighted location" marker color for when the user
  // mouses over the marker.
  var highlightedIcon = makeMarkerIcon('FFFF24');

  //Using the universities array to create an array of markers on initialize
  universities.forEach(function(university, i) {
    //Get the position from the Universities array
    var position = universities[i].location;
    var name = universities[i].name;
    var establishedYear = universities[i].Established_Year;
    //console.log(name)

    //create the marker per university and push into markers array.
    var marker = new google.maps.Marker({
      map:map,
      position: position,
      name: name,
      establishedYear: establishedYear,
      animation: google.maps.Animation.DROP,
      icon: defaultIcon,
      id: i
    });
    // push the marker to the array of markers
    markers.push(marker);

    // Setting up foursquare

    var apiUrl = 'https://api.foursquare.com/v2/venues/search';
    var foursquareClientID = 'G3FJ4CIV1G5ACHP1QDFS2Y4THHV2IIJ4VHUBVYPDH4WPWBAH';
    var foursquareSecret = 'R4BGKGLSB2EXI3MXHYXZ342LSHZ5RAC5AM3EWSMQAXJUZK2M';
    var foursquareVersion =  '20171012';
    var lat = position.lat;
    var lng = position.lng;
    var query = 'coffee';

    var foursquareApiUrl = apiUrl + '?ll='+ lat + ',' + lng + '&query='+ query + '&client_id=' + foursquareClientID +  '&client_secret=' + foursquareSecret +'&v=' + foursquareVersion + '&limit=' + 10;
    //console.log(foursquareApiUrl);

    $.ajax({
      url:foursquareApiUrl,
      dataType: 'json',
      data: {
        foursquareClientID: foursquareClientID,
        foursquareSecret: foursquareSecret,

        async: true
      },
      success: function(data) {
        //var venue = [];
        var venues = data.response.venues;
        console.log('index:', i);
        
        //fU.coffeeShopsList()[i].coffeeShops.push(venue);
        //fU.coffeeShopsList()[0].coffeeShops.push(venues)
        fU.finnishUniversitiesList()[i].coffeeShops(venues);
      },
      error: function(e){
        alert("Sorry Couldnt Load Data!!!");
      },

    });


    // Pass the marker from the initMap to the FinnishUnivesity ko observarble array
    fU.finnishUniversitiesList()[i].marker = marker;

    //Extend the boundaries of the map for each marker
    bounds.extend(marker.position);

    //Add click event to open the infowindow on each marker.
    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfoWindow);
    });

    //Two event listeners - one for mouseover, one for mouseout,
      //to change the colors back and forth.
      marker.addListener('mouseover', function() {
        this.setIcon(highlightedIcon);
      });
      marker.addListener('mouseout', function() {
        this.setIcon(defaultIcon);
      });

    // Functionality to animate the marker or or its associate when clicked.
    google.maps.event.addListener(marker, 'click', (function(marker) {
      return function(event) {
        // console.log(fU.finnishUniversitiesList()[marker.id].coffeeShops());
        // Clicking on the marker also displays the foursquare api 
        fU.coffeeShopsList(fU.finnishUniversitiesList()[marker.id].coffeeShops());
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
          setTimeout(function() {
            marker.setAnimation(null);
            }, 2000);
          }
        };
      })(marker));
    });
  
  map.fitBounds(bounds);
}


//This function populate the infowindow with the infomation set when the marker is clicked.
//In this case one info window
function populateInfoWindow(marker, infowindow){
  //A check to see if infowindow is not already open on the marker
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    infowindow.setContent('<div>' + marker.name + '<br>'+ 'Established: ' + marker.establishedYear + '</div>');
    infowindow.open(map, marker);
    //clear the marker propety if infowwindow is closed.
    infowindow.addListener('closeclick', function() {
      infowindow.setMap(null);
    });
  }
}

// This function takes in a COLOR, and then creates a new marker
// icon of that color. The icon will be 21 px wide by 34 high, have an origin
// of 0, 0 and be anchored at 10, 34).
function makeMarkerIcon(markerColor) {
   var markerImage = new google.maps.MarkerImage(
      'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
      '|40|_|%E2%80%A2',
      new google.maps.Size(21, 34),
      new google.maps.Point(0, 0),
      new google.maps.Point(10, 34),
      new google.maps.Size(21,34));
    return markerImage;
}



//The FinnishUniversitiesViewModel is created as the ViewModel
//Initially started withh logic used in KO multiple cats project.
//Some functions such displayMarkerInfo was written based on the disscussion by 
//other students and mentors on the Udacity course forum especially 
//https://discussions.udacity.com/t/location-list-button-array-and-click-events/290058/18
//Sarah did well explaining how the google.maps.event.trigger works which 
//initially I was struggling with.
//1 one 1 appointments with Karol really helped me simplify things.
var FinnishUniversitiesViewModel = function() {

  var self = this;

  var finnishUniversity = function(university){
    this.name = university.name;
    this.marker = university.marker;
    this.coffeeShops = ko.observableArray([]);
  };

  //Knockout observable array is created
  self.finnishUniversitiesList = ko.observableArray([]);

  // filter university observable
  self.uniSearchInput = ko.observable("");

  //List of Universities is pushed into the Knockout observable array
  universities.forEach(function(university){
    self.finnishUniversitiesList.push( new finnishUniversity(university) );
  });

  // This function initiates displays the required info on the maps marker 
  //when the observarble array items is clicked
  self.displayMarkerInfo = function(university){
    //console.log('finnishUniversitiesList clicked')
    //console.log(university.coffeeShops()[0].name)
    //console.log(university.coffeeShops())
    self.coffeeShopsList(university.coffeeShops());
    google.maps.event.trigger(university.marker, 'click');
  };

  // Implementing coffe shops near list

  self.coffeeShopsList = ko.observableArray([]);


  //Implementing the filter functionality
  //Started with the discussion here
  //https://stackoverflow.com/questions/20857594/knockout-filtering-on-observable-array
  //http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html
  
  self.filterUniversity = ko.computed(function(){

    var filter = self.uniSearchInput().toLowerCase();

    if (!filter) {

      self.finnishUniversitiesList().forEach(function(university) {
        if (university.marker) {
          university.marker.setVisible(true);
        }
      });

      return self.finnishUniversitiesList();

    } else {

      return ko.utils.arrayFilter(self.finnishUniversitiesList(), function(searchUniversity) {

        if (searchUniversity.name.toLowerCase().indexOf(filter) !== -1) {

          searchUniversity.marker.setVisible(true);
        } else {

          searchUniversity.marker.setVisible(false);
        }

        return searchUniversity.name.toLowerCase().indexOf(filter) !== -1;

      });
    }
  });

};


// A global variable to store an instance of View Model
var fU = new FinnishUniversitiesViewModel();


// Apply the bindings to the global instance
ko.applyBindings(fU);

//Google maps API Error handling
function googleMapsError() {
  alert("Sorry!!  There seems to be a problem with the Google Maps Loading");
}
