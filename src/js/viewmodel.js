/**
 * View Model knockout uses to apply bindings
 */
var viewModel = function() {
  var self = this;
  var input = document.getElementById('input');
  var drawer = document.getElementsByTagName('paper-drawer-panel')[0];
  self.workList = ko.observableArray([]);

  /**
   * creates a new marker, attaches a listener for clicks, and returns it.
   * @param  {Work} work - a Work object
   * @return {google.Maps.marker} - an Google map marker instance
   */
  self.addMarker = function(work) {
    var marker = new google.maps.Marker({
      position: {lat: work.latitude, lng: work.longitude},
      title: work.name,
      map: map,
      icon: work.markerIcon
    });
    marker.addListener('click', function() {
      self.toggleClicked(work);
    });
    return marker;
  };

  /**
   * adds a bounce animation to a marker and removes it after two bounces
   * @param  {[google.Maps.marker]} marker - the marker to make bounce
   */
  self.startBounce = function(marker) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function() {marker.setAnimation(null);}, 1400);
  };

  /**
   * closes all infoWindows, sets all isClicked() to false,
   * sets the clicked work's isClicked() to true, then opens its infoWindow
   * @param  {Work} work - the work item that was clicked
   */
  self.toggleClicked = function(work) {
    self.workList().forEach(function(workFromList) {
      if (workFromList.infoWindow !== null) {
        workFromList.infoWindow.close();
      }
      workFromList.isClicked(false);
    });

    work.isClicked(true);

    // Auto-close the side panel on click (only works on mobile viewport sizes)
    drawer.closeDrawer();
    work.infoWindow = new google.maps.InfoWindow({
      content:  work.wikiInfo
    });
    work.infoWindow.open(map, work.marker);
    // bounce the marker on click
    self.startBounce(work.marker);
  };

  // Take each object in initialWorks, create a Work object from it, and add it to the workList array
  initialWorks.forEach(function(work) {
    self.workList.push(new Work(work));
  });

  // Then take the locations of the works into account when first sizing the map
  // See: https://stackoverflow.com/questions/10268033/google-maps-api-v3-method-fitbounds
  var bounds = new google.maps.LatLngBounds();
  self.workList().forEach(function(work) {
    var latLng = new google.maps.LatLng(work.latitude, work.longitude);
    bounds.extend(latLng);
  });
  map.fitBounds(bounds);

  // For each of the works in the workList array, create and set its marker and wikiInfo properties
  var wikiBaseUrl = 'https://en.wikipedia.org/w/api.php?format=json&formatversion=2&action=query&prop=extracts&exintro=&explaintext=&exchars=300&pageids=';
  var streetViewBaseUrl = 'https://maps.googleapis.com/maps/api/streetview?size=200x200&key=AIzaSyC6ulNy4A2PyqHTu0sjc6l4t_XOMg_tRAU&location=';
  self.workList().forEach(function(work) {
    work.marker = self.addMarker(work);

    // JSONP error handling must be done via timeout, as there's no error handling built in
    var wikiRequestTimeout = setTimeout(function() {
      work.wikiInfo = 'Unfortunately, we hit a snag retrieving Wikipedia information!';
    }, 8000);
    var wikiInfo = $.ajax({
                      url: wikiBaseUrl + work.wikiPageId,
                      dataType: 'jsonp'
                    })
                    .done(function(response) {
                      var extract = response.query.pages[0].extract;
                      work.wikiInfo = '<div class="info-window">' +
                                      '<p class="info-window-wiki">';
                      extract ?
                        work.wikiInfo = work.wikiInfo + extract :
                        work.wikiInfo = work.wikiInfo + work.name +
                                        ' unfortunately has no entry on Wikipedia.';
                      work.wikiInfo = work.wikiInfo +
                                      '</p>' +
                                      '<img class="info-window-image" alt="Street View Image" ' +
                                      'src="' + streetViewBaseUrl +
                                      work.latitude + ',' + work.longitude +
                                      '&heading=' + work.heading +
                                      '">' + '</div>';
                      clearTimeout(wikiRequestTimeout);
                    });
  });

  // Attach a listener to the input element that filters the workList and markers
  input.oninput = function() {
    // Filter the list
    self.workList().forEach(function(work) {
      work.name.toUpperCase().search(input.value.toUpperCase()) !== -1 ?
        work.isInList(true) : work.isInList(false);
    });

    // Filter the markers
    self.workList().forEach(function(work) {
      work.isInList() ?
        work.marker.setVisible(true) : work.marker.setVisible(false);
    });
  };

};
