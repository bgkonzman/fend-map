var viewModel = function() {
  var self = this;
  var input = document.getElementById("input");
  this.workList = ko.observableArray([]);

  this.addMarker = function(work) {
    var marker = new google.maps.Marker({
      position: {lat: work.latitude, lng: work.longitude},
      title: work.name,
      map: map,
      icon: work.markerIcon
    });
    marker.addListener("click", function() {
      self.toggleClicked(work);
    });
    return marker;
  }

  var streetViewBaseUrl = "https://maps.googleapis.com/maps/api/streetview?size=200x200&key=AIzaSyC6ulNy4A2PyqHTu0sjc6l4t_XOMg_tRAU&location="
  this.toggleClicked = function(work) {
    work.isClicked( !work.isClicked() );
    if ( work.isClicked() ) {
      work.infoWindow = new google.maps.InfoWindow({
        content:  work.wikiInfo
                  + '<img class="info-window-image" src="'
                  + streetViewBaseUrl
                  + work.latitude + ","
                  + work.longitude
                  + "&heading="
                  + work.heading
                  + '">'
                  + "</div>"
      });
      work.infoWindow.open(map, work.marker);
      work.markerIcon = "http://maps.google.com/mapfiles/ms/icons/purple-dot.png";
    }
    else {
      work.markerIcon = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
      work.infoWindow.close();
    }
    work.marker.setIcon( work.markerIcon );
  }

  initialWorks.forEach( function(workItem) {
    self.workList.push( new Work(workItem) );
  });

  var wikiBaseUrl = "https://en.wikipedia.org/w/api.php?format=json&formatversion=2&action=query&prop=extracts&exintro=&explaintext=&exchars=512&pageids=";
  this.workList().forEach( function(work) {
    work.marker = self.addMarker(work);

    if (work.wikiInfo === null){
      var wikiInfo = $.ajax({
              url: wikiBaseUrl + work.wikiPageId,
              dataType: "jsonp"})
            .done( function(response) {
              var extract = response.query.pages[0].extract;
              work.wikiInfo = '<div class="info-window">'
                              + '<p class="info-window-wiki">';
              if (extract) {
                work.wikiInfo = work.wikiInfo + extract;
              }
              else {
                work.wikiInfo = work.wikiInfo + work.name
                                + " unfortunately has no entry on Wikipedia.";
              }
              work.wikiInfo = work.wikiInfo + "</p>";
            })
            .fail( function(response) {
              console.log(response);
              work.wikiInfo = "Unfortunately, we hit a snag retrieving Wikipedia information!"
            });
    }
  });

  input.oninput = function() {
    self.workList().forEach( function(work) {
      if (work.name.toUpperCase().search(input.value.toUpperCase()) !== -1) {
        work.isInList( true );
      }
      else {
        work.isInList( false );
      }
    });

    self.workList().forEach( function(work) {
      if ( work.isInList() ) {
        work.marker.setVisible(true);
      }
      else {
        work.marker.setVisible(false);
      }
    });
  }

}

ko.applyBindings(new viewModel());
