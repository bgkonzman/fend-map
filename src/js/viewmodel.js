var viewModel = function() {
  var self = this;
  var input = document.getElementById('input');
  var drawer = document.getElementsByTagName('paper-drawer-panel')[0];
  self.workList = ko.observableArray([]);

  // addMarker() creates a new marker, attaches a listener for clicks, and returns it.
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

  // startBounce() adds a bounce animation to a marker and removes it after two bounces
  self.startBounce = function(marker) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function() {marker.setAnimation(null);}, 1400);
  };

  // toggleClicked() changes the state of a work's isClicked() boolean, then
  // opens an infoWindow if isClicked() is true, or closes the infoWindow if it's false.
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
    self.startBounce(work.marker);
  };

  // Take each object in initialWorks, create a Work object from it, and add it to the workList array
  initialWorks.forEach(function(work) {
    self.workList.push(new Work(work));
  });

  // For each of the works in the workList array, create and set its marker and wikiInfo properties
  var wikiBaseUrl = 'https://en.wikipedia.org/w/api.php?format=json&formatversion=2&action=query&prop=extracts&exintro=&explaintext=&exchars=300&pageids=';
  var streetViewBaseUrl = 'https://maps.googleapis.com/maps/api/streetview?size=200x200&key=AIzaSyC6ulNy4A2PyqHTu0sjc6l4t_XOMg_tRAU&location=';
  self.workList().forEach(function(work) {
    work.marker = self.addMarker(work);

    // Wikipedia requires the use of jsonp to get information from their REST api.
    // This is the only thing for which jQuery is used in this project, as implementing
    // the same functionality in vanilla js still seemed quite complicated. Any suggestions
    // about a better way to do this such that we can avoid including a jQuery dependency,
    // with its additional latency and overhead, would be most appreciated.
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
                    })
                    .fail(function(response) {
                      console.log(response);
                      work.wikiInfo = 'Unfortunately, we hit a snag retrieving Wikipedia information!';
                    });

  });

  // Attach a listener to the input element that filters the workList
  // This cannot be done with a knockoutjs data binding because of the way that
  // Polymer's <paper-input> element gets added to the page - there's no guarantee
  // that the input node will be in the DOM before knockout applies its bindings.
  // It's probably possible to apply the bindings to that specific element after document.ready,
  // but that solution seems at least as hacky as simply adding a listener directly like this.
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
